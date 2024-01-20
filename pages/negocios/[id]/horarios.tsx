import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, TextField } from '@mui/material';
import ModalForm from '@/components/modalForm';

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

export default function Horarios() {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const fields = [
    {id: 'diaDeApertura', name: 'diaDeApertura', label: 'Dia de Apertura'},
    {id: 'diaDeCierre', name: 'diaDeCierre', label: 'Dia de Cierre'},
    {id: 'horarioDeApertura', name: 'horarioDeApertura', label: 'Horario de Apertura', type: 'number'},
    {id: 'horarioDeCierre', name: 'horarioDeCierre', label: 'Horario de Cierre', type: 'number'},
  ]
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalForm initialOpen={true} handleClose={handleClose} fields={fields} title="Horarios"/>
          <div className="flex flex-row justify-between">
            <Button onClick={handleClose}>Volver</Button>
            <Button onClick={handleClose}>Guardar</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
