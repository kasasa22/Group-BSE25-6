import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from '../frontend/src/screens/Dashboard';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../frontend/src/components/Datas', () => ({
  dashboardCards: [
    {
      id: 1,
      title: 'Card Title 1',
      value: 100,
      percent: 60,
      color: ['bg-blue-500', 'text-blue-500', '#blue'],
      datas: [10, 20, 30],
      icon: () => <div>Icon</div>,
    },
    {
      id: 4,
      title: 'Card Title 2',
      value: 200,
      percent: 40,
      color: ['bg-green-500', 'text-green-500', '#green'],
      datas: [40, 50, 60],
      icon: () => <div>Icon</div>,
    },
  ],
  memberData: [
    { id: 1, title: 'Patient 1', phone: '123456789', image: 'path/to/img' },
  ],
  appointmentsData: [
    {
      id: 1,
      time: '10:00 AM',
      status: 'Approved',
      user: { title: 'User 1' },
      from: '10:00',
      to: '11:00',
    },
  ],
  transactionData: [
    { id: 1, amount: 1000, status: 'Success' },
    { id: 2, amount: 2000, status: 'Failed' },
  ],
}));

jest.mock('../frontend/src/components/Charts', () => ({
  DashboardBigChart: () => <div>Big Chart</div>,
  DashboardSmallChart: () => <div>Small Chart</div>,
}));

jest.mock('../frontend/src/components/Tables', () => ({
  Transactiontable: ({ data }) => (
    <table>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.amount}</td>
            <td>{item.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
}));

describe('Dashboard Component', () => {
  test('renders Dashboard with cards and charts', async () => {
    await render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    // Wait for elements to appear
    await waitFor(() => {
      expect(screen.getByText('Card Title 1')).toBeInTheDocument();
      expect(screen.getByText('Card Title 2')).toBeInTheDocument();
    });

    expect(screen.getByText('Big Chart')).toBeInTheDocument();
    expect(screen.getByText('Small Chart')).toBeInTheDocument();
  });

  test('renders recent transactions', async () => {
    await render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('1000')).toBeInTheDocument();
      expect(screen.getByText('Success')).toBeInTheDocument();
      expect(screen.getByText('2000')).toBeInTheDocument();
      expect(screen.getByText('Failed')).toBeInTheDocument();
    });
  });

  test('renders recent patients', async () => {
    await render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Patient 1')).toBeInTheDocument();
      expect(screen.getByText('123456789')).toBeInTheDocument();
    });
  });

  test('renders today’s appointments', async () => {
    await render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('10:00 AM')).toBeInTheDocument();
      expect(screen.getByText('User 1')).toBeInTheDocument();
      expect(screen.getByText('10:00 - 11:00')).toBeInTheDocument();
    });
  });
});
