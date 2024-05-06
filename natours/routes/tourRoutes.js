const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.param('id', tourController.checkID);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTop5Cheap, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/get-monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protectRoutes, tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protectRoutes,
    authController.restrictTo('ADMIN', 'TOUR_LEAD'),
    tourController.deleteTour,
  );

module.exports = router;
