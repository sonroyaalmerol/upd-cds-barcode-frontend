import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/auth/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function register(data) {
  return request({
    url: '/auth/register',
    method: 'post',
    data
  })
}

export function registerDm(data) {
  return request({
    url: '/auth/register/dm',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/auth/users/own',
    method: 'get'
    // params: { token }
  })
}

export function getTheme() {
  return request({
    url: '/setting/theme',
    method: 'get'
  })
}

export function setTheme(data) {
  return request({
    url: '/setting/theme',
    method: 'post',
    data
  })
}

export function uploadImage(data, config) {
  return request({
    url: '/images',
    method: 'post',
    data,
    config
  })
}

export function getProfile(role, id) {
  var which = ''
  switch (role) {
    case 0:
      which = 'residents'
      break
    case 1:
      which = 'assistants'
      break
    case 2:
      which = 'managers'
      break
  }
  return request({
    url: `/${which}/${id}`,
    method: 'get'
  })
}

export function permits(kind) {
  return request({
    url: `/permits?kind=${kind}`,
    method: 'get'
  })
}

export function permitsAll(page) {
  return request({
    url: `/permits?all=true&page=${page}`,
    method: 'get'
  })
}

export function permitsResident(page, residentId) {
  return request({
    url: `/permits?resident=${residentId}&page=${page}`,
    method: 'get'
  })
}

export function deleteUserById(id) {
  return request({
    url: `/auth/users/${id}`,
    method: 'delete'
  })
}

export function getUserById(id) {
  return request({
    url: `/auth/users/${id}`,
    method: 'get'
  })
}

export function getResidentById(id) {
  return request({
    url: `/residents/${id}`,
    method: 'get'
  })
}

export function getAssistantById(id) {
  return request({
    url: `/assistants/${id}`,
    method: 'get'
  })
}

export function getPISById(id) {
  return request({
    url: `/instructions/${id}`,
    method: 'get'
  })
}

export function getInOutById(id) {
  return request({
    url: `/inoutentries/${id}`,
    method: 'get'
  })
}

export function applyPermit(data) {
  return request({
    url: '/permits',
    method: 'post',
    data
  })
}

export function residents() {
  return request({
    url: `/residents`,
    method: 'get'
  })
}

export function addResident(data) {
  return request({
    url: `/residents`,
    method: 'post',
    data
  })
}

export function batchResident(data) {
  return request({
    url: `/residents?batch=true`,
    method: 'post',
    data
  })
}

export function updateResident(data, id) {
  return request({
    url: `/residents/${id}`,
    method: 'put',
    data
  })
}

export function deleteResident(id) {
  return request({
    url: `/residents/${id}`,
    method: 'delete'
  })
}

export function assistants() {
  return request({
    url: `/assistants`,
    method: 'get'
  })
}

export function addAssistant(data) {
  return request({
    url: `/assistants`,
    method: 'post',
    data
  })
}

export function updateAssistant(data, id) {
  return request({
    url: `/assistants/${id}`,
    method: 'put',
    data
  })
}

export function deleteAssistant(id) {
  return request({
    url: `/assistants/${id}`,
    method: 'delete'
  })
}

export function staffs() {
  return request({
    url: `/staffs`,
    method: 'get'
  })
}

export function addStaff(data) {
  return request({
    url: `/staffs`,
    method: 'post',
    data
  })
}

export function updateStaff(data, id) {
  return request({
    url: `/staffs/${id}`,
    method: 'put',
    data
  })
}

export function deleteStaff(id) {
  return request({
    url: `/staffs/${id}`,
    method: 'delete'
  })
}

export function managers() {
  return request({
    url: `/managers`,
    method: 'get'
  })
}

export function addManager(data) {
  return request({
    url: `/managers`,
    method: 'post',
    data
  })
}

export function updateManager(data, id) {
  return request({
    url: `/managers/${id}`,
    method: 'put',
    data
  })
}

export function deleteManager(id) {
  return request({
    url: `/managers/${id}`,
    method: 'delete'
  })
}

export function addPIS(data) {
  return request({
    url: `/instructions`,
    method: 'post',
    data
  })
}

export function updatePIS(data, id) {
  return request({
    url: `/instructions/${id}`,
    method: 'put',
    data
  })
}

export function inoutentries(profileId, page, a) {
  var all = a || ''
  return request({
    url: `/inoutentries?profileId=${profileId}${all ? '&all=true' : `&page=${page}`}`,
    method: 'get'
  })
}

export function keyborrowentries(profileId) {
  return request({
    url: `/keyborrowentries?profileId=${profileId}`,
    method: 'get'
  })
}

export function getKeyBorrowEntryById(id) {
  return request({
    url: `/keyborrowentries/${id}`,
    method: 'get'
  })
}

export function addKeyBorrowEntry(data) {
  return request({
    url: `/keyborrowentries`,
    method: 'post',
    data
  })
}

export function violationsAll() {
  return request({
    url: `/violations?all=true`,
    method: 'get'
  })
}

export function violations(residentId) {
  return request({
    url: `/violations?residentId=${residentId}`,
    method: 'get'
  })
}

export function addViolation(data) {
  return request({
    url: `/violations`,
    method: 'post',
    data
  })
}

export function deleteViolation(id) {
  return request({
    url: `/violations/${id}`,
    method: 'delete'
  })
}

export function accountabilities(residentId) {
  return request({
    url: `/accountabilities?residentId=${residentId}`,
    method: 'get'
  })
}

export function accountabilitiesAll() {
  return request({
    url: `/accountabilities?all=true`,
    method: 'get'
  })
}

export function addAccountability(data) {
  return request({
    url: `/accountabilities`,
    method: 'post',
    data
  })
}

export function batchAccountability(data) {
  return request({
    url: `/accountabilities?batch=true`,
    method: 'post',
    data
  })
}

export function clearAccountability(id, name) {
  return request({
    url: `/accountabilities/${id}`,
    method: 'put',
    data: {
      cleared: true,
      clearedBy: name,
      clearedOn: new Date()
    }
  })
}

export function deleteAccountability(id) {
  return request({
    url: `/accountabilities/${id}`,
    method: 'delete'
  })
}

export function directives(assistantId) {
  return request({
    url: `/directives?assistantId=${assistantId}`,
    method: 'get'
  })
}

export function addDirective(data) {
  return request({
    url: `/directives`,
    method: 'post',
    data
  })
}

export function accomplishDirective(id) {
  return request({
    url: `/directives/${id}`,
    method: 'put',
    data: {
      done: true,
      doneOn: new Date()
    }
  })
}

export function activities() {
  return request({
    url: `/activities`,
    method: 'get'
  })
}

export function getActivity(id) {
  return request({
    url: `/activities/${id}`,
    method: 'get'
  })
}

export function getActivityStatistics(id) {
  return request({
    url: `/activities/${id}/statistics`,
    method: 'get'
  })
}

export function createActivity(data) {
  return request({
    url: `/activities`,
    method: 'post',
    data
  })
}

export function updateActivity(data, id) {
  return request({
    url: `/activities/${id}`,
    method: 'put',
    data
  })
}

export function deleteActivity(id) {
  return request({
    url: `/activities/${id}`,
    method: 'delete'
  })
}

export function activityInOuts(x, y) {
  var activity = x || ''
  var profile = y || ''
  return request({
    url: `/activityInOuts?activity=${activity}&profile=${profile}`,
    method: 'get'
  })
}

export function toProcessActivityInOuts(x) {
  var activity = x || ''
  return request({
    url: `/activityInOuts?activity=${activity}&process=true`,
    method: 'get'
  })
}

export function activityInEntry(data) {
  return request({
    url: `/activityInOuts`,
    method: 'post',
    data
  })
}

export function activityOutEntry(data) {
  return request({
    url: `/activityInOuts?out=true`,
    method: 'post',
    data
  })
}

export function updateActivityInOut(data, id) {
  return request({
    url: `/activityInOuts/${id}`,
    method: 'put',
    data
  })
}

export function confirmActivityInOut(data, id) {
  return request({
    url: `/activityInOuts/${id}?confirm=true`,
    method: 'put',
    data
  })
}

export function undoConActivityInOut(data, id) {
  return request({
    url: `/activityInOuts/${id}?removecon=true`,
    method: 'put',
    data
  })
}

export function deleteActivityInOut(id) {
  return request({
    url: `/activityInOuts/${id}`,
    method: 'delete'
  })
}

export function forms() {
  return request({
    url: `/forms`,
    method: 'get'
  })
}

export function deleteDirective(id) {
  return request({
    url: `/directives/${id}`,
    method: 'delete'
  })
}

export function createForm(data) {
  return request({
    url: `/forms`,
    method: 'post',
    data
  })
}

export function updateForm(data, id) {
  return request({
    url: `/forms/${id}`,
    method: 'put',
    data
  })
}

export function closeForm(id) {
  return request({
    url: `/forms/${id}`,
    method: 'put',
    data: {
      closed: true
    }
  })
}

export function openForm(id) {
  return request({
    url: `/forms/${id}`,
    method: 'put',
    data: {
      closed: false
    }
  })
}

export function deleteForm(id) {
  return request({
    url: `/forms/${id}`,
    method: 'delete'
  })
}

export function responses(id) {
  return request({
    url: `/forms/${id}/responses`,
    method: 'get'
  })
}

export function addResponse(data, id) {
  return request({
    url: `/forms/${id}/responses`,
    method: 'post',
    data
  })
}

export function approvePermit(id, remarks) {
  return request({
    url: `/permits/${id}?approve=1`,
    method: 'put',
    data: {
      remarks
    }
  })
}

export function rejectPermit(id, remarks) {
  return request({
    url: `/permits/${id}?reject=1`,
    method: 'put',
    data: {
      remarks
    }
  })
}

export function deletePermit(id) {
  return request({
    url: `/permits/${id}`,
    method: 'delete'
  })
}

export function notifications() {
  return request({
    url: `/notifications`,
    method: 'get'
  })
}

export function readNotification(id) {
  return request({
    url: `/notifications/${id}`,
    method: 'put',
    data: {
      read: true
    }
  })
}