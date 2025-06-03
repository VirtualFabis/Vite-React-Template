import styled from '@emotion/styled';
import { Box, SvgIcon } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
} from '@mui/x-data-grid';
import { useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useMutation } from '@tanstack/react-query';
import { insertOrUpdateUserAccess } from '@services/users-service';
import toast, { Toaster } from 'react-hot-toast';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  color: 'rgba(255,255,255,0.85)',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: '#1d1d1d',
    ...theme.applyStyles('light', {
      backgroundColor: '#fafafa',
    }),
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: '1px solid #303030',
    ...theme.applyStyles('light', {
      borderRightColor: '#f0f0f0',
      borderBottomColor: '#f0f0f0',
    }),
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: '1px solid #303030',
    ...theme.applyStyles('light', {
      borderBottomColor: '#f0f0f0',
    }),
  },
  '& .MuiDataGrid-cell': {
    color: 'rgba(255,255,255,0.65)',
    ...theme.applyStyles('light', {
      color: 'rgba(0,0,0,.85)',
    }),
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0,
  },
  ...theme.applyStyles('light', {
    color: 'rgba(0,0,0,.90)',
  }),
}));

const UserTable = ({ initialState, roles }) => {
  const [rows, setRows] = useState(() => initialState);
  const [rowModesModel, setRowModesModel] = useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const insertUserAccess = useMutation({
    mutationKey: ['InsertUserAccess'],
    mutationFn: insertOrUpdateUserAccess,
    onSuccess: () => toast.success('Usuario actualizado'),
    onError: () => toast.error('Error al actualizar el usuario '),
  });

  const onInsertUserAccess = (wiw, role, custom) => {
    const idRol = roles.get(role);
    insertUserAccess.mutate({ wiw, idRol, custom });
  };

  const handleEditClick = (id) => () =>
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });

  const handleSaveClick = (id) => () =>
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.guid === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.guid !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.guid === newRow.guid ? updatedRow : row)));
    onInsertUserAccess(newRow.WIW, newRow.USER_ROLE, newRow.CUSTOM);
    return updatedRow;
  };

  const handleDeleteClick = (id) => () => {
    const row = rows.find((row) => row.guid === id);
    setRows(rows.filter((row) => row.guid !== id));
    onInsertUserAccess(row.WIW, 'User', row.CUSTOM);
  };

  const handleRowModesModelChange = (newRowModesModel) => setRowModesModel(newRowModesModel);

  const columns = getColumns(
    rowModesModel,
    handleEditClick,
    handleSaveClick,
    handleDeleteClick,
    handleCancelClick,
  );

  return (
    <>
      <Toaster />
      <Box sx={{ height: '700px', width: '100%' }}>
        <StyledDataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.guid}
          rowHeight={36}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 16,
              },
            },
          }}
          editMode='row'
          pageSizeOptions={[16, 20, 50, 100]}
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
        />
      </Box>
    </>
  );
};
const getColumns = (
  rowModesModel,
  handleEditClick,
  handleSaveClick,
  handleDeleteClick,
  handleCancelClick,
) => {
  return [
    {
      field: 'WIW',
      headerName: 'Wiw',
      minWidth: 60,
      flex: 1,
      editable: false,
    },
    {
      field: 'NAME',
      headerName: 'Nombre',
      minWidth: 60,
      flex: 1,
      editable: false,
    },
    {
      field: 'LAST_NAME',
      headerName: 'Apellidos',
      minWidth: 60,
      flex: 1,
      editable: false,
    },
    {
      field: 'USER_ROLE',
      headerName: 'Rol',
      minWidth: 220,
      flex: 1,
      editable: true,
      type: 'singleSelect',
      valueOptions: ({ row }) => {
        const values = new Set(['User']);
        values.add(row.USER_ROLE);
        return [...values];
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      maxWidth: 190,
      flex: 1,
      cellClassName: 'actions',
      getActions: ({ id }) =>
        getActions(
          id,
          rowModesModel,
          handleEditClick,
          handleSaveClick,
          handleDeleteClick,
          handleCancelClick,
        ),
    },
  ];
};
const getActions = (
  id,
  rowModesModel,
  handleEditClick,
  handleSaveClick,
  handleDeleteClick,
  handleCancelClick,
) => {
  const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
  return isInEditMode
    ? getEditActions(id, handleSaveClick, handleCancelClick)
    : getViewActions(id, handleEditClick, handleDeleteClick);
};

const getEditActions = (id, handleSaveClick, handleCancelClick) => [
  <GridActionsCellItem
    key={`save-${id}`}
    icon={<SvgIcon fontSize='medium' as={SaveIcon} />}
    label='Save'
    sx={{
      color: 'primary.main',
    }}
    onClick={handleSaveClick(id)}
  />,
  <GridActionsCellItem
    key={`cancel-${id}`}
    icon={<SvgIcon fontSize='medium' as={CloseIcon} />}
    label='Cancel'
    className='textPrimary'
    onClick={handleCancelClick(id)}
    color='inherit'
  />,
];

const getViewActions = (id, handleEditClick, handleDeleteClick) => [
  <GridActionsCellItem
    key={`edit-${id}`}
    icon={<SvgIcon fontSize='medium' as={CreateIcon} />}
    label='Edit'
    className='textPrimary'
    onClick={handleEditClick(id)}
    color='inherit'
  />,
  <GridActionsCellItem
    key={`delete-${id}`}
    icon={<SvgIcon fontSize='medium' as={DeleteForeverIcon} />}
    label='Delete'
    onClick={handleDeleteClick(id)}
    color='inherit'
  />,
];

export default UserTable;
