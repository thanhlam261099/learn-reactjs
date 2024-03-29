import React, { useEffect, useMemo } from 'react'
import { useState } from 'react'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import TodoList from '../../components/TodoList'
import queryString from 'query-string'
import TodoForm from '../../components/TodoForm'

ListPage.propTypes = {}

function ListPage(props) {
  const initTodoList = [
    {
      id: 1,
      title: 'Eat',
      status: 'new',
    },
    {
      id: 2,
      title: 'Sleep',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Code',
      status: 'new',
    },
  ]

  const location = useLocation()
  const history = useHistory()
  const match = useRouteMatch()
  const [todoList, setTodoList] = useState(initTodoList)
  const [filteredStatus, setFilteredStatus] = useState(() => {
    const params = queryString.parse(location.search)
    return params.status || 'all'
  })

  useEffect(() => {
    const params = queryString.parse(location.search)
    setFilteredStatus(params.status || 'all')
  }, [location.search])

  const handleTodoClick = (todo, idx) => {
    console.log(todo, idx)
    const newTodoList = [...todoList]

    newTodoList[idx] = {
      ...newTodoList[idx],
      status: newTodoList[idx].status === 'new' ? 'completed' : 'new',
    }

    setTodoList(newTodoList)
  }

  const handleShowAllClick = () => {
    // setFilterStatus('all')
    const queryParams = { status: 'all' }
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    })
  }

  const handleShowCompletedClick = () => {
    // setFilterStatus('completed')
    const queryParams = { status: 'completed' }
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    })
  }

  const handleShowNewClick = () => {
    // setFilterStatus('new')
    const queryParams = { status: 'new' }
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    })
  }

  const renderTodoList = useMemo(() => {
    return todoList.filter((todo) => filteredStatus === 'all' || filteredStatus === todo.status)
  }, [todoList, filteredStatus])

  const handleTodoFormSubmit = (values) => {
    const newTodo = {
      id: todoList.length + 1,
      title: values.title,
      status: 'new',
    }

    const newTodoList = [...todoList, newTodo]

    setTodoList(newTodoList) 
  }

  return (
    <div>
      <div>
        <h3>What to do</h3>
        <TodoForm onSubmit={handleTodoFormSubmit} />

        <h3>Todo List</h3>
        <TodoList todoList={renderTodoList} onTodoClick={handleTodoClick} />
        <div>
          <button onClick={handleShowAllClick}>Show all</button>
          <button onClick={handleShowCompletedClick}>Show completed</button>
          <button onClick={handleShowNewClick}>Show new</button>
        </div>
      </div>
    </div>
  )
}

export default ListPage
