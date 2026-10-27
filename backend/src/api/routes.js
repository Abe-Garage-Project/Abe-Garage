import { Router } from 'express';
import authRoutes from './auth/routes/auth.route.js';
import profileRoutes from './profile/routes/profile.route.js';
import employeesRoutes from './employees/routes/employee.route.js';
import settingsRoutes from './settings/routes/settings.route.js';
import rolesRoutes from './settings/routes/roles.route.js';
import customersRoutes from './customers/routes/customer.route.js';
import vehiclesRoutes from './vehicles/routes/vehicle.route.js';
import servicesRoutes from './services/routes/service.route.js';
import publicServicesRoutes from './services/routes/public-service.route.js';
import ordersRoutes from './orders/routes/order.route.js';
import technicianJobsRoutes from './technician-jobs/routes/technician-job.route.js';
import myJobsRoutes from './technician-jobs/routes/my-jobs.route.js';
import billingRoutes from './billing/routes/billing.route.js';
import trackingRoutes from './tracking/routes/tracking.route.js';
import orderNotificationsRoutes from './tracking/routes/order-notification.route.js';
import dashboardRoutes from './dashboard/routes/dashboard.route.js';
import setupRoutes from './setup/routes/setup.route.js';

export const mainRouter = Router();

// /api is mounted once in backend/index.js. Prefixes belong here.
mainRouter.use('/auth', authRoutes);
mainRouter.use('/profile', profileRoutes);
mainRouter.use('/employees', employeesRoutes);
mainRouter.use('/settings', settingsRoutes);
mainRouter.use('/roles', rolesRoutes);
mainRouter.use('/customers', customersRoutes);
mainRouter.use('/vehicles', vehiclesRoutes);
mainRouter.use('/services', servicesRoutes);
mainRouter.use('/public/services', publicServicesRoutes);
mainRouter.use('/orders', ordersRoutes);
mainRouter.use('/order-lines', technicianJobsRoutes);
mainRouter.use('/my-jobs', myJobsRoutes);
mainRouter.use('/orders', billingRoutes);
mainRouter.use('/public/orders', trackingRoutes);
mainRouter.use('/orders', orderNotificationsRoutes);
mainRouter.use('/dashboard', dashboardRoutes);
mainRouter.use('/', setupRoutes);
