import "./kanban.scss";

import React, { useEffect, useRef, useState } from "react";

import { DATA } from "@/static";

const KanbanBoard = () => {
  const [data, setData] = useState(DATA);
  const [status, setStatus] = useState(null);

  let title = useRef();
  let desc = useRef();
  localStorage.setItem("kanbanData", JSON.stringify(data));

  let statuses = ["ready", "working", "stuck", "done"];

  let time = new Date();
  const filterByItems = (status) => {
    return data
      ?.filter((el) => el.status === status)
      ?.map((el) => (
        <div key={el.id} className="kanban__item">
          <div className="item__top">
            <p>{el.title}</p>
            <button
              onClick={() => handleDelete(el.id)}
              className="delete__item"
            >
              Delete
            </button>
          </div>
          <p className="kanban__commit">{el.desc}</p>
          <div className="kanban__info">
            <select
              value={el.status}
              onChange={(e) => handleStatusChange(el.id, e.target.value)}
            >
              {statuses?.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <span>
              {time.getHours()}:{time.getMinutes()}
            </span>
          </div>
        </div>
      ));
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure")) {
      setData((prev) => prev.filter((el) => el.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let id = new Date().getTime();

    let newItem = {
      id,
      title: title.current.value,
      desc: desc.current.value,
      status,
    };
    setData((prev) => [...prev, newItem]);
    setStatus(null);
    title.current.value = "";
    desc.current.value = "";
  };

  return (
    <section>
      <div className="container">
        <div className="kanban">
          <h2 className="kanban__title">Kanban Board</h2>
          <div className="kanban__header">
            <button
              className="kanban__btn"
              onClick={() => setStatus("working")}
            >
              Add
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            action=""
            className={`kanban__form ${status ? "show" : ""}`}
          >
            <input required ref={title} type="text" placeholder="title" />
            <input required ref={desc} type="text" placeholder="desc" />
            <button className="kanban__create__btn">Create</button>
            <button
              className="kanban__form__close-btn"
              onClick={() => setStatus(null)}
            >
              Close
            </button>
          </form>

          <div className="kanban__wrapper">
            <div className="kanban__box ready">
              <div className="kanban__heading">
                <p>Ready to start / {filterByItems("ready").length}</p>
              </div>
              <div className="kanban__block">
                {filterByItems("ready").length > 0
                  ? filterByItems("ready")
                  : "no reference"}
              </div>
              <button
                onClick={() => setStatus("ready")}
                className="kanban__add_btn"
              >
                Add item
              </button>
            </div>
            <div className="kanban__box working">
              <div className="kanban__heading">
                <p>Working to start / {filterByItems("working").length}</p>
              </div>
              <div className="kanban__block">
                {filterByItems("working").length > 0
                  ? filterByItems("working")
                  : "no reference"}
              </div>
              <button
                onClick={() => setStatus("working")}
                className="kanban__add_btn"
              >
                Add item
              </button>
            </div>
            <div className="kanban__box stuck">
              <div className="kanban__heading">
                <p>Stuck to start / {filterByItems("stuck").length}</p>
              </div>
              <div className="kanban__block">
                {filterByItems("stuck").length > 0
                  ? filterByItems("stuck")
                  : "no reference"}
              </div>
              <button
                onClick={() => setStatus("stuck")}
                className="kanban__add_btn"
              >
                Add item
              </button>
            </div>
            <div className="kanban__box done">
              <div className="kanban__heading">
                <p>Done to start / {filterByItems("done").length}</p>
              </div>
              <div className="kanban__block">
                {filterByItems("done").length > 0
                  ? filterByItems("done")
                  : "no reference"}
              </div>
              <button
                onClick={() => setStatus("done")}
                className="kanban__add_btn"
              >
                Add item
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KanbanBoard;
