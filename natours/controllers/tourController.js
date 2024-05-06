const Tour = require('../models/tourModel');
const AppError = require('../utils/appError');
const createAsync = require('../utils/createAsync');
// const APIFeatures = require('../utils/apiFeatures');
const Facet = require('../utils/facet');

exports.aliasTop5Cheap = (req, res, next) => {
  // req.query.ratingsAverage = req.query.ratingsAverage || {};
  // req.query.ratingsAverage.gte = 4.5;
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'failed',
      message: 'Missing name & price',
    });
  }
  next();
};

exports.getAllTours = createAsync(async (req, res, next) => {
  // const features = new APIFeatures(Tour.find(), req.query)
  //   .filter()
  //   .sort()
  //   .limitField()
  //   .pagination();
  // const tours = await features.query;

  const facets = new Facet(Tour, req.query);
  const results = await facets.filters();
  const tours = results[0].result;
  const totalResults = results[0].count.count;
  const resultsPerPage = tours.length;
  const totalPages = Math.ceil(totalResults / (req.query.limit || 10));
  const currentPage = !totalResults ? 0 : req.query.page * 1 || 1;
  const nextPage =
    totalResults && currentPage + 1 <= totalPages
      ? currentPage + 1
      : currentPage;
  res.status(200).json({
    status: 'success',
    totalResults,
    totalPages,
    currentPage,
    nextPage,
    resultsPerPage,
    data: { tours },
  });
});

exports.createTour = createAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    data: { tour: newTour },
  });
});

exports.getTour = createAsync(async (req, res, next) => {
  const { id } = req.params;
  const tour = await Tour.findById(id);
  if (!tour) {
    return next(new AppError(`No tour found with ID: ${id}`, 404));
  }
  res.status(200).json({
    message: 'success',
    data: { tour },
  });
});

exports.updateTour = createAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!tour) {
    return next(new AppError(`No tour found with ID: ${req.params.id}`, 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

exports.deleteTour = async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  if (!tour) {
    return next(new AppError(`No tour found with ID: ${req.params.id}`, 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

exports.getTourStats = createAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        minPrice: {
          $min: '$price',
        },
        maxPrice: {
          $max: '$price',
        },
        totalDoc: {
          $sum: 1,
        },
        avgRating: {
          $avg: '$ratingsAverage',
        },
        numRatings: { $sum: '$ratingsQuantity' },
        avgPrice: { $avg: '$price' },
      },
    },
    {
      $sort: { minPrice: -1 },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: { stats },
  });
});

exports.getMonthlyPlan = createAsync(async (req, res, next) => {
  const year = req.params.year * 1; // 2021

  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { numTourStarts: -1 },
    },
    {
      $limit: 12,
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      plan,
    },
  });
});
