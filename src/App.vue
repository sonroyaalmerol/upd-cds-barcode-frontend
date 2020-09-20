<template>
  <v-app dark id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      clipped
      permanent
      app
      :width="275"
    >
      <v-list dense>
        <v-subheader class="ml-2 grey--text text--darken-1">ENTRIES</v-subheader>
        <template v-for="entry in toShow">
          <v-list-item
            dense
            color="success"
            :key="entry._id"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ entry.krhid }} ({{ getTime(entry.timestamp) }})
              </v-list-item-title>
              <v-list-item-subtitle v-if="entry.status === 1"><b><font color="#69F0AE">IN</font></b></v-list-item-subtitle>
              <v-list-item-subtitle v-else-if="entry.status === 0"><b><font color="#FF8A80">OUT</font></b></v-list-item-subtitle>
              <v-list-item-subtitle v-else-if="entry.status === -1"><b>Not yet submitted!</b></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      clipped-left
      app
      flat
      color="#fcb69f"
      :src="require('./assets/header.jpg')"
      dark
    >
      <template v-slot:img="{ props }">
        <v-img v-bind="props" :gradient="appBarGradient"></v-img>
      </template>

      <Logo />

      <v-toolbar-title dark class="headline hidden-sm-and-down">
        <span class="font-weight-light ms-3">e</span>
        <span>Kalay</span>
        <span class="font-weight-light"> - Centralized Database System</span>
      </v-toolbar-title>
      <v-text-field
        v-on:keyup.enter="submit"
        ref="krhidField"
        flat
        solo
        hide-details
        prepend-inner-icon="mdi-account-search"
        placeholder="Resident ID"
        v-model="krhid"
        class="ml-8"
        :disabled="loading"
      />
      <v-spacer />
    </v-app-bar>

    <v-content>
      <v-container>
        <v-card
          class="mx-auto"
          color="#D0667A"
          dark flat
        >
          <center>
            <v-card-text class="font-weight-bold ma-2 display-4">
              <div class="my-4">{{ time }}</div>
            </v-card-text>
          </center>
        </v-card>
        <v-card
          :loading="loading"
          flat
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title v-if="showStuff"
                class="ml-12 mt-12 display-2 font-weight-black"
              >
                <transition name="fade">
                  <template v-if="welcomeBack && !errorMsg && !checkIn"><b><font color="#69F0AE">IN</font></b></template>
                  <template v-else-if="!welcomeBack && !errorMsg && !checkIn"><b><font color="#FF8A80">OUT</font></b></template>
                  <template v-else-if="welcomeBack && !errorMsg && checkIn">He/she is <b><font color="#69F0AE">IN</font></b>!</template>
                  <template v-else-if="!welcomeBack && !errorMsg && checkIn">He/she is <b><font color="#FF8A80">OUT</font></b>!</template>
                  <template v-else>Error!</template>
                </transition>
              </v-card-title>

              <v-card-subtitle v-if="showStuff" class="display-1 ml-12 mt-4">
                <transition name="fade">
                  <p v-if="welcomeBack && !errorMsg && !checkIn">Welcome back!</p>
                  <p v-if="!welcomeBack && !errorMsg && !checkIn">Bye! Have a nice day!</p>
                  <p v-if="errorMsg">{{ errorMsg }}</p>
                  <p v-if="violation > -1">
                      Sorry! I'm giving you a <b>violation</b> for this one! ({{ intToViolation(violation) }})
                  </p>
                  <p v-if="accountability">You have accountabilities to settle on your eKalay account. Please check them as soon as possible!</p>
                </transition>
              </v-card-subtitle>
            </div>
            <v-avatar
              class="ma-4"
              size="350"
            >
              <v-img :src="image"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-container>
      <v-footer
        absolute
        class="font-weight-medium"
      >
        <v-col
          class="text-center"
          cols="12"
        >
          <v-offline
            @detected-condition="amIOnline">
            <template v-slot:[onlineSlot] :slot-name="onlineSlot">
              <v-alert v-if="onLine" type="success">
                System online
              </v-alert>
              <v-alert v-else type="error">
                System offline
              </v-alert>
            </template>
          </v-offline>
        </v-col>
      </v-footer>
    </v-content>
  </v-app>
</template>

<script>
  import { format, parseISO } from 'date-fns'
  import Dexie from 'dexie'
  import VOffline from 'v-offline'
  import axios from 'axios'

  const db = new Dexie('inoutDB')
  const residents = new Dexie('residents')
  const permits = new Dexie('permits')
  const violations = new Dexie('violations')
  const Logo = () => import('@/components/layout/Logo')

  export default {
    props: {
      source: String,
    },
    components: {
      Logo,
      VOffline
    },
    async created() {
      this.startInterval()
      this.syncData()
      this.updateLocalData()

      db.version(1).stores({
        entries: '++id, timestamp, krhid, status, sent'
      })
      this.entries = await db.entries.toArray()

      residents.version(1).stores({
        entries: '_id, displayPhoto, krhid, _inout, firstName, lastName, _pis'
      })
      this.residents = await residents.entries.toArray()

      permits.version(1).stores({
        entries: '_id, dataOne, dataTwo, location, reason, notes, permitType, timestamp, _resident, _pis, processedBy, remarksRA, remarksDM'
      })
      this.permits = await permits.entries.toArray()

      violations.version(1).stores({
        entries: '++id, ismajor, details, timestamp, _resident'
      })
      this.violations = await permits.entries.toArray()

      this.$refs.krhidField.focus()
      
    },
    computed: {
      appBarGradient() {
        return 'to top right, rgba(66,66,66,1), rgba(0,0,0,.8)'
      },
      toShow() {
        return this.entries.slice(Math.max(this.entries.length - 12, 1)).reverse()
      },
    },
    watch: {
      onLine: async function (val) {
        if (val) {
          await this.submitPending()
          this.$refs.krhidField.focus()
        }
      },
      loading: function (val) {
        if (!val) {
          this.$refs.krhidField.focus()
        }
      }
    },
    data: () => ({
      baseURL: 'https://api.updkalay.com/api/v2/inoutentries',
      drawer: null,
      time: format(new Date(), 'h:mm:ss a'),
      entries: [],
      krhid: '',
      onLine: null,
      onlineSlot: 'online',
      offlineSlot: 'offline',
      loading: false,
      violation: -1,
      accountability: false,
      welcomeBack: true,
      error: false,
      errorMsg: '',
      checkIn: false,
      showStuff: false,
      image: require('./assets/profpic.png'),
      permits: [],
      residents: [],
      violations: []
    }),
    methods: {
      intToViolation(vio) {
        switch((vio-210)) {
          case 0:
            return 'Late Night'
          case 1:
            return 'Overnight'
          case 2:
            return 'Early Morning'
        }
      },
      getTime(time) {
        return format(new Date(time), 'h:mm:ss a, MM/dd/yyyy')
      },
      startInterval() {
        setInterval(async () => {
          this.time = format(new Date(), 'h:mm:ss a')
          this.$refs.krhidField.focus()
        }, 1000)
      },
      syncData() {
        setInterval(async () => {
          var x = await axios.get('https://api.updkalay.com/api/v2/sync/inoutentries', { headers: { 'secret-key': process.env.VUE_APP_SECRET } })
          await residents.entries.bulkPut(x.data.residents)
          await permits.entries.bulkPut(x.data.permits)
        }, 5000)
      },
      updateLocalData() {
        setInterval(async () => {
          this.entries = await db.entries.toArray()
          this.violations = await permits.entries.toArray()
          this.permits = await permits.entries.toArray()
          this.residents = await residents.entries.toArray()
        }, 1000)
      },
      amIOnline(e) {
        this.onLine = e
      },
      async submitPending() {
        this.loading = true
        var entries = await db.entries.where('sent').equals(0).toArray()
        for (const entry of entries) {
          var res = await axios.post(this.baseURL, { timestamp: entry.timestamp, krhid: entry.krhid, secretKey: process.env.VUE_APP_SECRET })
          await db.entries.update(entry.id, { sent: 1, status: res.data.status ? 1 : 0 })
        }
        this.loading = false
        this.$refs.krhidField.focus()
      },
      async submit() {
        this.loading = true
        if (/^(KRH-\d{4}-\d{3})$/.test(this.krhid) || /^(KRH-\d{4}-\d{2})$/.test(this.krhid) || /^(KRH-\d{4}-\d{3}-V)$/.test(this.krhid)) {
          var currentId = await db.entries.add({
            timestamp: (new Date()).toJSON(),
            krhid: this.krhid,
            status: -1,
            sent: 0
          })
          var entry = await db.entries.get(currentId)
          if (this.onLine) {
            const res = await axios.post(this.baseURL, { timestamp: entry.timestamp, krhid: entry.krhid, secretKey: process.env.VUE_APP_SECRET })
            this.showStuff = true
            if (res.data.displayPhoto) {
              this.image = res.data.displayPhoto.replace('/upload/', '/upload/w_400,h_400,c_fill,g_face/')
            }
            if (res.status >= 210 && res.status <= 212) {
              this.violation = res.status
            }
            if (res.status === 220) {
              this.accountability = true
            }
            if (res.data.status) {
              // (Welcome back!)
              this.welcomeBack = true
            } else {
              // (Byebye!)
              this.welcomeBack = false
            }
            await db.entries.update(currentId, { sent: 1, status: res.data.status ? 1 : 0 })
          } else {
            this.showStuff = true
            this.errorMsg = 'System offline! Your entry has been queued.'
          }
        } else if (/^(KRH-\d{4}-\d{3}-C)$/.test(this.krhid) || /^(KRH-\d{4}-\d{2}-C)$/.test(this.krhid) ) {
          if (this.onLine) {
            const urlCheck = `${this.baseURL}?krhid=${this.krhid.replace('-C', '')}`
            const res = await axios.get(urlCheck, { secretKey: process.env.VUE_APP_SECRET })
            this.showStuff = true
            this.checkIn = true
            if (res.data.displayPhoto) {
              this.image = res.data.displayPhoto.replace('/upload/', '/upload/w_400,h_400,c_fill,g_face/')
            }
            if (res.data.status) {
              // (Welcome back!)
              this.welcomeBack = true
            }
            else {
              // (Byebye!)
              this.welcomeBack = false
            }
          } else {
            this.showStuff = true
            this.errorMsg = 'System offline!'
          }
        } else {
          this.showStuff = true
          this.errorMsg = 'Invalid barcode!'
        }
        setTimeout(() => {
          this.loading = false
          this.errorMsg = ''
          this.krhid = ''
          this.violation = -1
          this.accountability = false
          this.checkIn = false
          this.showStuff = false
          this.image = require('./assets/profpic.png')
          this.$refs.krhidField.focus()
        }, 2550)
      },
    }
  }
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
