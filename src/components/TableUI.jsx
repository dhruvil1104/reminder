import * as React from 'react';
import {
  DataGrid,
  Toolbar,
  ToolbarButton,
  ColumnsPanelTrigger,
} from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import Chip from '@mui/material/Chip';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

function CustomToolbar() {
  return (
    <Toolbar>
      <Tooltip title="Columns">
        <ColumnsPanelTrigger render={<ToolbarButton />}>
          <ViewColumnIcon fontSize="small" />
        </ColumnsPanelTrigger>
      </Tooltip>
    </Toolbar>
  );
}

export default function GridColumnsPanelTrigger() {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');
  const [searchParams] = useSearchParams();

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'description', headerName: 'Description', width: 150 },
    { field: 'startdate', headerName: 'Start Date', width: 200 },
    { field: 'enddate', headerName: 'End Date', width: 200 },
    { field: 'reminder_date', headerName: 'Days Remaining', width: 150 },
    { field: 'email', headerName: 'CreatedBy', width: 160 },
    { field: 'assigned_to_email', headerName: 'AssignTo', width: 160 },
    { field: 'reminder', headerName: 'Reminder', width: 160 },
    // { field: 'status', headerName: 'Status', width: 160 },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      renderCell: (params) => {
        const status = params.value?.toLowerCase();

        const statusMap = {
          completed: { label: 'Completed', color: 'success', icon: '✔️' },
          'in progress': { label: 'In Progress', color: 'warning', icon: '⏳' },
          pending: { label: 'Pending', color: 'default', icon: '🕒' },
          failed: { label: 'Failed', color: 'error', icon: '❌' },
        };

        const { label, color, icon } = statusMap[status] || {
          label: status,
          color: 'info',
          icon: '✔️',
        };

        return (
          <Chip
            label={
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>{icon}</span>
                <span>{label}</span>
              </span>
            }
            color={color}
            variant="outlined"
            size="small"
          />
        );
      },
    },
  ];

  React.useEffect(() => {
    axios
      .get(`${API_URL}/tasks/user?f=${searchParams.get('f') || ''}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const transformedData = response.data.map((item) => ({
          id: item.id,
          startdate: item.startdate,
          enddate: item.enddate,
          email: item.email,
          status: item.status,
          description: item.description,
          reminder_date: item.reminder_date,
          assigned_to_email: item.assigned_to_email,
          reminder: item.reminder,
      
        }));
        setRows(transformedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [searchParams]);

  return (
    <div
      style={{
        height: 700,
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: '4px',
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        slots={{ toolbar: CustomToolbar }}
        showToolbar
      />
    </div>
  );
}
