import React, { useEffect, useState } from "react";
import CourseForm from "./CourseForm";
import { toast } from "react-toastify";
import * as courseApi from "../api/courseApi";

const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });

  useEffect(() => {
    const slug = props.match.params.slug;
    if (slug) {
      courseApi.getCourseBySlug(slug).then((_course) => setCourse(_course));
    }
  }, [props.match.params.slug]);

  function handleChange({ target }) {
    setCourse({ ...course, [target.name]: target.value });
  }
  function formIsValid() {
    const _error = {};

    if (!course.title) _error.title = "Title is required";
    if (!course.authorId) _error.authorId = "Author ID is required";
    if (!course.category) _error.category = "Category is required";

    setErrors(_error);

    return Object.keys(_error).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    courseApi.saveCourse(course).then(props.history.push("/courses"));
    toast.success("Course saved");
  }
  return (
    <>
      <h2>Manage Course</h2>
      {props.match.params.slug}
      <CourseForm
        errors={errors}
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
