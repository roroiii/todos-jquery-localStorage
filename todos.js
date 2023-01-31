let todos = []
let id = 1

function setLocalData () {
  window.localStorage.setItem('todoApp', JSON.stringify(todos))
}

$(document).ready(function () {
  const todoData = window.localStorage.getItem('todoApp')
  if(todoData) {
    todos = JSON.parse(todoData)
    console.log(todoData)

    for(var i = 0; i < todos.length; i++) {
    $('.todolist').append(`
      <div class="todo" data-id="${todos[i].id}">
        <div class="todo-left">
          <div class="todo-state">${todos[i].isCompleted ? 'O' :'X'}</div>
          <div class="todo-contant">${todos[i].text}</div>
        </div>
        <div class="todo-right">
          <button class="todo-toggle done">${todos[i].isCompleted ? '已完成' : '未完成'}</button>
          <button class="todo-delete">刪除</button>
        </div>
      </div>
    `)
    }
    id = todos[todos.length - 1].id + 1
  }

  $('.submit').click(function () {
    let inputValue = $("input[name='todo-value']").val()
    if (inputValue === '') return

    todos.push({
      id,
      text: inputValue,
      isCompleted: false
    })

    $('.todolist').append(`
      <div class="todo" data-id="${id}">
        <div class="todo-left">
          <div class="todo-state">X</div>
          <div class="todo-contant">${inputValue}</div>
        </div>
        <div class="todo-right">
          <button class="todo-toggle done">未完成</button>
          <button class="todo-delete">刪除</button>
        </div>
      </div>
    `)
    $("input[name='todo-value']").val("")
    id++
    setLocalData()
  })

  $('.todolist').on('click', '.todo-toggle', function (e) {
    const buttonText = $(e.target)
    const id = Number(buttonText.parent().parent().attr('data-id'))
    let state = buttonText.parent().parent().find('.todo-state').text()
    if (state === 'X') {
      buttonText.text('已完成')
      buttonText.parent().parent().find('.todo-state').text('O')
      buttonText.addClass('done')
    } else {
      buttonText.text('未完成')
      buttonText.parent().parent().find('.todo-state').text('X')
      buttonText.removeClass('done')
    }

    todos = todos.map(todo => {
      if(todo.id !== id) return todo
      return {
        ...todo,
        isCompleted: !todo.isCompleted
      }
    })
    setLocalData()
  })

  $('.todolist').on('click', '.todo-delete', function (e) {
    const buttonDelete = $(e.target)
    const id = Number(buttonDelete.parent().parent().attr('data-id'))
    buttonDelete.parent().parent().remove()
    todos = todos.filter(todo => todo.id !== id)
  })
  setLocalData()
})
