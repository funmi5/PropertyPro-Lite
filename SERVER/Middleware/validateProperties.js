import db from '../DBconfig/index';

class ValidateProperties {
  static postProperty(req, res, next) {
    const {
      status, price, state, city, address, type, image_url,
    } = req.body;
    if (!status || !price || !state || !city || !address || !type || !image_url
    ) {
      return res.status(400)
        .json({
          status: 'error',
          error: 'Please, supply the required fields!',
        });
    }
    next();
  }

  static async updateProperty(req, res, next) {
    const {
      price, state, city, address, type, image_url,
    } = req.body;
    if (!price || !state || !city || !address || !type || !image_url
    ) {
      return res.status(400)
        .json({
          status: 'error',
          error: 'Please, supply the required fields!',
        });
    }
    const updateQuery = 'SELECT * FROM Property WHERE property_id=$1';
    const { rows } = await db.query(updateQuery, [req.params.property_id]);
    if (!rows[0]) {
      return res.status(404)
        .json({
          status: 'error',
          error: 'Property not found!',
        });
    }

    return next();
  }
}
export default ValidateProperties;
