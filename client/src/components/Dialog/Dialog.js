import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";

export default function FormDialog(props) {

  //DECLARANDO OS ELEMENTOS DA TABELA
  const [editValues, setEditValues] = useState({
    id: props.id,
    task: props.task,
    status: props.status,
    comments: props.comments,
  });

  //INSERINDO UM NOVO REGISTRO NA TABELA
  const handleChangeValues = (values) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [values.target.id]: values.target.value,
    }));
  };

  //FECHANDO A CAIXA DE DIALOG
  const handleClose = () => {
    props.setOpen(false);
  };

  //EDITANDO UM REGISTRO DA TABELA
  const handleEditTask = () => {
    Axios.put("http://localhost:3001/edit", {
      id: editValues.id,
      task: editValues.task,
      status: editValues.status,
      comments: editValues.comments,
    }).then(() => {
      props.setListCard(
        props.listCard.map((value) => {
          return value.id === editValues.id
            ? {
                id: editValues.id,
                task: editValues.task,
                status: editValues.status,
                comments: editValues.comments,
              }
            : value;
        })
      );
    });
    handleClose();
  };

  //DELETANDO UM REGISTRO DA TABELA
  const handleDeleteTask = () => {
    Axios.delete(`http://localhost:3001/delete/${editValues.id}`)
      .then(() => {
      props.setListCard(
        props.listCard.filter((value) => {
          return value.id !== editValues.id;
        })
      );
    });
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            margin="dense"
            id="id"
            label="id"
            defaultValue={props.id}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="task"
            label="Tarefa"
            defaultValue={props.task}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            margin="dense"
            id="status"
            label="Status da Tarefa"
            defaultValue={props.status}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
       
            margin="dense"
            id="comments"
            label="Comentários"
            defaultValue={props.comments}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button color="primary" onClick={() => handleDeleteTask()}>
            Excluir
          </Button>
          <Button color="primary" onClick={() => handleEditTask()}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}