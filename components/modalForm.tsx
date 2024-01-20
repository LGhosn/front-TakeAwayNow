import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import React from "react";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface ModalFormProps {
  initialOpen: boolean
  handleClose: any
  fields ?: any
  title ?: string
}

export default function ModalForm({initialOpen, handleClose, fields, title}: ModalFormProps) {
  const [open, setOpen] = React.useState(initialOpen);

  return (
    <>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Grid container spacing={3}>
            {fields.map((field: any) => (
              <Grid item xs={12} sm={6} key={field}>
                <TextField
                  required
                  id={field.id}
                  name={field.name}
                  label={field.label}
                  type={field.type}
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  defaultValue={field.defaultValue}
                />
              </Grid>
            ))  
            }
          </Grid>   
          <div className="flex flex-row justify-between">
            <Button onClick={handleClose}>Volver</Button>
            <Button onClick={handleClose}>Guardar</Button>
          </div>
        </Box>
      </Modal>
    </>
  )
}