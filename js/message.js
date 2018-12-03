!(function() {
  var view = document.querySelector('section.message')

  var model = {
    init: function() {
      var APP_ID = '1NadAaXSmmEG9oKo5y8GNyon-gzGzoHsz'
      var APP_KEY = 'ATuxIIgPJaP7usrxfxVVRbbz'
      AV.init({
        appId: APP_ID,
        appKey: APP_KEY
      })
    },
    addData: function(name, content) {
      var Message = AV.Object.extend('Message')
      var message = new Message()
      // 返回一个Promise对象
      return message.save({
        name: name,
        content: content
      })
    },
    getData: function() {
      var query = new AV.Query('Message')
      // 返回一个Promise对象
      return query.find()
    }
  }

  var controller = {
    view: null,
    model: null,
    messageList: null,
    init: function(view, model) {
      this.view = view
      this.model = model
      this.messageList = view.querySelector('#messageList')
      this.form = view.querySelector('#messageForm')
      this.model.init()
      this.loadMessages()
      this.bindEvents()
    },
    loadMessages: function() {
      this.model.getData().then(
        (messages) => {
          let array = messages.map((item) => item.attributes)
          array.forEach((item) => {
            let li = document.createElement('li')
            let name = document.createElement('div')
            let content = document.createElement('p')
            name.innerText = item.name + ':'
            name.className = 'name'
            content.innerText = item.content
            content.className = 'content'
            li.appendChild(name)
            li.appendChild(content)
            this.messageList.appendChild(li)
          })
        }
      )
    },
    bindEvents: function() {
      var that = this
      this.form.addEventListener('submit', function(e) {
        e.preventDefault()
        that.saveMessage()
      })
    },
    saveMessage: function() {
      let myForm = this.form
      let name = myForm.querySelector('#nameInput').value
      let content = myForm.querySelector('#contentTextarea').value
      if (!name) {
        alert('请输入您的昵称！')
        return
      }
      if (!content) {
        alert('请输入您的留言内容！')
        return
      }
      this.model.addData(name, content).then(function(object) {
        let li = document.createElement('li')
        let nameElement = document.createElement('div')
        let contentElement = document.createElement('p')
        nameElement.innerText = name + ':'
        nameElement.className = 'name'
        contentElement.innerText = content
        contentElement.className = 'content'
        li.appendChild(nameElement)
        li.appendChild(contentElement)
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(li)
        myForm.querySelector('#nameInput').value = ''
        myForm.querySelector('#contentTextarea').value = ''
      })
    }

  }

  controller.init(view, model)

}).call()