const mongoose = require('mongoose');
const slugify = require('slugify');
/**
 * @type {mongoose.SchemaDefinitionProperty}
 */

const schema = new mongoose.Schema(
  {
    name: {
      unique: true,
      type: String,
      required: [true, 'A tour must have a name'],
      trim: true,
      minLength: [10, 'A tour name must be greater than 10'],
      maxLength: [40, 'A tour name must be less than 40'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have'],
    },
    difficulty: {
      type: String,
      enum: {
        values: ['easy', 'medium', 'hard'],
        message: 'Difficulty is either: easy medium or hard ',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'A tour must have min rating 1.0'],
      max: [5, 'A tour must have max rating 5.0'],
    },
    ratingsQuantity: {
      type: Number,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        // this only points to current doc on NEW document creation
        validator: function (val) {
          return this.price > val;
        },
        message:
          'The price discount ({VALUE}) must be than less than original price',
      },
    },
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a imageCover'],
    },
    images: {
      type: [String],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: {
      type: [Date],
    },
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

schema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// DOCUMENT middleware only run before .save() and .create()
schema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true, trim: true });
  next();
});
// QUERY MIDDLEWARE
// tourSchema.pre('find', function(next) {
schema.pre(/^find/, async function (next) {
  // this.totalCounts = await this.model.countDocuments(this._conditions);
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

schema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

// AGGREGATION MIDDLEWARE
schema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

  next();
});

schema.post('aggregate', (docs, next) => {
  if (!docs[0].result.length) {
    return next();
  }
  next();
});

const Tour = mongoose.model('Tour', schema);

module.exports = Tour;
