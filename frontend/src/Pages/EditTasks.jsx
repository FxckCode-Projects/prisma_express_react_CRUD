import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";

function EditTasks() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [categories, setCategories] = useState([])
  const title = useRef(null);
  const description = useRef(null);
  const category = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    axiosClient.get(`/task/${id}`).then((response) => {
      setData(response.data);
    });
    axiosClient.get("/categories").then((response) => {
        setCategories(response.data)
    })
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault()
    const data = {
        title: title.current.value,
        description: description.current.value,
        categoryId: category.current.value
    }

    axiosClient.put(`/task/${id}`, data).finally(() => {
        navigate('/')
    })

  }
  return (
    <div className="container">
      <h2>TASKS CRUD</h2>
      <div className="content">
        <h3>Create task</h3>
        <form onSubmit={handleUpdate}>
          <label htmlFor="title">Title</label>
          <input type="text" placeholder="Title" name="title" defaultValue={data.title} ref={title}/>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            placeholder="Description"
            name="description"
            defaultValue={data.description}
            ref={description}
          />
          <label htmlFor="category">Category</label>
          <select name="category" id="category" ref={category}>
            <option value="">Seleccionar</option>
            {
                categories.map(c => (
                    <option value={c.id} key={c.id} selected={data.categoryId == c.id ? true : false}>{c.name}</option>
                ))
            }
          </select>
          <button>Editar</button>
        </form>
      </div>
    </div>
  );
}

export default EditTasks;
