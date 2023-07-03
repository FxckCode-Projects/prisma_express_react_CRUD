import { useEffect, useState } from "react"
import "../scss/Dashboard.scss"
import axiosClient from "../axios-client";
import { useRef } from "react";
import {Link} from 'react-router-dom'

function Dashboard() {
  const [data, setData] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([])
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axiosClient.get("/tasks").then((response) => {
        setData(response.data)
    })

    axiosClient.get("/categories").then((response) => {
        setCategories(response.data)
    })

    axiosClient.get("/completed").then((response) => {
        setCompletedTasks(response.data)
    })
  }, [])
  const title = useRef(null);
  const description = useRef(null);
  const category = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
        title: title.current.value,
        description: description.current.value,
        categoryId: category.current.value
    }
    axiosClient.post("/tasks", data).finally(() => {
        window.location.reload()
    })
  }

  const deleteTask = (e, id) => {
    e.preventDefault()
    axiosClient.delete(`/tasks/${id}`).finally(() => {
        window.location.reload()
    })
  }

  const checkedTask = (e, id) => {
    e.preventDefault()
    axiosClient.put(`/checktask/${id}`).finally(() => {
        window.location.reload()
    })
  }
  const nameCategory = useRef(null);
  const createCategory = (e) => {
    e.preventDefault()
    const data = {
        name: nameCategory.current.value
    }
    axiosClient.post("/categories", data).finally(() => {
        window.location.reload()
    })
  }
  return (
    <div className="container">
        <h2>TASKS CRUD</h2>
        <div className="content">
            <h3>Create task</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" placeholder="Title" name="title" ref={title}/>
                <label htmlFor="description">Description</label>
                <input type="text" placeholder="Description" name="description" ref={description} />
                <label htmlFor="category">Category</label>
                <select name="category" id="category" ref={category}>
                    <option value="">Seleccionar</option>
                    {
                        categories.map(c => (
                            <option value={c.id} key={c.id}>{c.name}</option>
                        ))
                    }
                </select>
                <button>Crear</button>
            </form>
            <h2>Create category</h2>
            <form onSubmit={createCategory}>
                <label htmlFor="name">Name</label>
                <input type="text" placeholder="Name" name="name" ref={nameCategory}/>
                <button>Crear</button>
            </form>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Check</th>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Interaction</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((d) => (
                        <tr key={d.id}>
                            <td><input type="checkbox" name="status" id="status" onChange={(e) => checkedTask(e, d.id)}  /></td>
                            <td>{d.id}</td>
                            <td>{d.title}</td>
                            <td>{d.description}</td>
                            <td>{d.category.name}</td>
                            <td>
                                <Link to={`/create/${d.id}`}>
                                    <button className="edit">Edit</button>
                                </Link>
                                <button className="delete" onClick={(e) => deleteTask(e, d.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <h2>Finalizadas</h2>
        <table>
            <thead>
                <tr>
                    <th>Check</th>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Interaction</th>
                </tr>
            </thead>
            <tbody>
                {
                    completedTasks.map((d) => (
                        <tr key={d.id}>
                            <td><input type="checkbox" name="status" id="status" defaultChecked={d.status}/></td>
                            <td>{d.id}</td>
                            <td>{d.title}</td>
                            <td>{d.description}</td>
                            <td>{d.category.name}</td>
                            <td>
                                <Link to={`/create/${d.id}`}>
                                    <button className="edit">Edit</button>
                                </Link>
                                <button className="delete" onClick={(e) => deleteTask(e, d.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default Dashboard