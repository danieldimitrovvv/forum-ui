import axios from 'axios'
import Auth from './Auth'


class Api {

  constructor () {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_API_URL
    })
    this.instance.defaults.headers.post['Content-Type'] = 'application/json'
  }

  setInterseptor (props) {
    this.instance.defaults.headers.common['Authorization'] = 'Bearer ' +
      Auth.getToken()
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        // Do something with response error
        props.history.push('/')
        return Promise.reject(error)
      })
    return this
  }

  async login (data) {
    const res = this.instance.post('/oauth/token',
      data,
      {
        auth: {
          username: 'admin',
          password: 'admin'
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    return res
  }

  // user
  async registration (user) {
    let res = await this.instance.post('/users/create', user)
    return res
  }

  async fetchUsers () {
    let res = await this.instance.get('/users/')
    return res
  }

  async fetchUserWithLastMessage (receiverId) {
    let res = await this.instance.get(`/messages/last-message/${receiverId}/`)
    return res
  }


  async fetchMessageByUserId (receiverId) {
    let res = await this.instance.get(`/messages/${receiverId}/`)
    return res
  }
  async createMessage (messge) {
    let res = await this.instance.post(`/messages`, messge)
    return res
  }

  async createScore (score) {
    let res = await this.instance.post(`/scores/`, score)
    return res
  }

  async getUser() {
    let res = await this.instance.get(`/users/get`);
    return res;
  }

  async searchUserByName(username) {
    let res = await this.instance.get(`/users/search-users/${username}`);
    return res;
  }

  async fetchUsersWithMessages() {
    console.log("fetchUsersWithMessages: ");
    let res = await this.instance.get(`/messages/last-recent-messages/`);
    console.log("fetchUsersWithMessages: ", res);
    return res;
  }

  async changeUserTheme(theme) {
    let res = await this.instance.post(`/users/update`, {...Auth.getUser(), theme: theme});
    return res;
  }

  async changeUserRoleByUserId(id, role) {
    let res = await this.instance.post(`/users/updateRole`, {id: id, role: role});
    return res;
  }
  
  async deleteUser (userId) {
    let res = await this.instance.post('/users/delete/' + userId)
    return res
  }

  // topic
  async fetchTopics () {
    let res = await this.instance.get('/topics/')
    return res
  }

  async fetchTopicsByPageAndSize (page, size) {
    let res = await this.instance.get(`/topics/page/?page=${page}&size=${size}`)
    return res
  }

  async postTopic (topic) {
    let res = await this.instance.post('/replies/reply-with-topic', topic)
    return res
  }

  async fetchTopicById (topicId) {
    let res = await this.instance.get(`/topics/id/${topicId}/`)
    return res
  }

  async addViewTopic(topicId) {
    let res = await this.instance.post(`/topics/increment-views-count/`, topicId)
    return res
  }

  // reply
  async fetchRepliesByTopicId (topicId) {
    let res = await this.instance.get(`/replies/id/${topicId}/`)
    return res
  }

  async fetchRepliesPageByTopicId (topicId, page, size) {
    let res = await this.instance.get(`/replies/page/?topicId=${topicId}&page=${page}&size=${size}`)
    return res
  }

  async createReply (reply) {
    let res = await this.instance.post(`/replies/`, reply)
    return res
  }

  // score
  async updateScore (score) {
    let res = await this.instance.post(`/scores/update/`, score)
    return res
  }

  async createScore (score) {
    let res = await this.instance.post(`/scores/`, score)
    return res
  }

  async getScoresByReplyId (replyId) {
    let res = await this.instance.get(`/scores/replyid/${replyId}/`)
    return res
  }

  async getScoresByReplyIdAndUserId (replyId) {
    let res = await this.instance.get(`/scores/replyid-and-userid/${replyId}/`);
    return res
  }

  async deleteScoreById(scoreId) {
    let res = await this.instance.get(`/scores/delete/${scoreId}/`);
    return res
  }

  async getReplyScoreInfoByReplyId(replyId) {
    let res = await this.instance.get(`/scores/reply-score-info/${replyId}/`);
    return res
  }
}

export default new Api()
