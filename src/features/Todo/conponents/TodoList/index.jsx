import React from 'react'
import PropTypes from 'prop-types'

TodoList.propTypes = {
  todoList: PropTypes.array,
}

TodoList.defaultProps = {
  todoList: [],
}

function TodoList({ todoList }) {
  return (
    <div>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
