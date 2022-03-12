import React, { useState } from "react";

import MaterialTable from "material-table";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import tableIcons from "../from/icons";
import api from "../utils/api";
import { withRouter } from "react-router-dom";
import { deleteUser, setUser, editUser } from "./actions/index";

const Formulario = (props) => {
  const { user } = props;
  console.log("facuuu - - - - ", user);

  const [userData] = React.useState({
    name: "",
    surname: "",
    salary: "",
  });

  const [columns] = useState([
    { title: "Nombre", field: "name" },
    {
      title: "Apellido",
      field: "surname",
    },
    { title: "salario", field: "salary", type: "numeric" },
  ]);

  const register = async (e) => {
    try {
      const postResposi = await api.post("/api/user", e);

      props.setUser(...user, postResposi.data);

      Swal.fire({
        icon: "success",
        title: "mensaje",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  };

  const update = async (e) => {
    try {
      const response = await api.put(`/api/user/${e._id}`, e);

      props.editUser(response.data);

      Swal.fire({
        icon: "success",
        title: "mensaje",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  };

  return (
    <MaterialTable
      icons={tableIcons}
      title="Editable Preview"
      columns={columns}
      data={props.user}
      editable={{
        onRowAdd: (newData) => {
          register(newData);
        },
        onRowUpdate: (newData) => {
          update(newData);
        },

        onRowDelete: (newData) => {
          return api._delete(`/api/user/${newData._id}`).then((data) => {
            props.deleteUser(newData);
          });

          // handleDelete(newData);
          //    Axios.deleteUser(newData);
        },
      }}
    />
  );
};

const mapStateToProps = (state) => {
  return { user: state.user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user)),
    editUser: (user) => dispatch(editUser(user)),
    deleteUser: (user) => dispatch(deleteUser(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Formulario));
