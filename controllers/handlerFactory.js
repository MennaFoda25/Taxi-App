const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const ApiFeatures = require('../utils/apiFeatures');

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.destroy({ where: { id } });

    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(204).send();
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const [updatedCount, updatedDocs] = await Model.update(req.body, {
      where: { id },
      returning: true,
    });

    if (!updatedCount) {
      return next(new ApiError(`No document for this id ${req.params.id}`, 404));
    }
    res.status(200).json({ data: updatedDocs[0] });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({ data: newDoc });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByPk(id);
    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.getAll = (Model, modelName = '') =>
  asyncHandler(async (req, res) => {
    // Build query
    const documentsCounts = await Model.count();
    const apiFeatures = new ApiFeatures(req.query)
      .filter()
      .sort()
      .limitFields()
      .search(modelName)
.paginate(documentsCounts);
    // Execute query
    const documents = await Model.findAll(apiFeatures.options);

    res.status(200).json({   results: documents.length,
      pagination: apiFeatures.paginationResult,
      data: documents, });
  });
