const { db, content, contact, sequelize } = require("../models");
const { QueryTypes } = require("sequelize");

const Query = {
  getContentData: async (root, { id }) => {
    try {
      // const data = await content.findByPk(id);
      let query = `SELECT * FROM content WHERE id=${id}`;
      const data = await sequelize.query(query, {
        type: QueryTypes.SELECT,
        raw: true,
      });

      console.log(data[0]);
      return data[0];
    } catch (err) {
      console.log(err);
    }
  },

  getAllContentData: async () => {
    try {
      // const data = await content.findAll();
      let query = "SELECT * FROM content";
      const data = sequelize.query(query, {
        type: QueryTypes.SELECT,
        raw: true,
      });
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  },

  getAllContact: async () => {
    try {
      let query = "SELECT * FROM contact";
      const contacts = await sequelize.query(query, {
        type: QueryTypes.SELECT,
        raw: true,
      });
      return contacts;
    } catch (err) {
      console.log(err);
    }
  },

  getContact: async (root, { id }) => {
    try{
      let query = `SELECT * FROM contact WHERE id=${id}`;
      const data = await sequelize.query(query, {
        type: QueryTypes.SELECT,
        raw: true
      });
      console.log(data)
      return data[0];
    }catch (err){
      console.log(err);
    }
  },

  getLastContact: async (root, { id }) => {
    try{
      let query = `SELECT * FROM contact ORDER BY id DESC LIMIT 1`

      const row = await sequelize.query(query, {
        type: QueryTypes.SELECT,
        raw: true
      });
      return row[0];
    }catch (err){
      console.log(err);
    }
  },
};

const Mutation = {
  sendMessage: async (root, { name, email, message }) => {
    try {
      // (await contact) && contact.create({ name, email, message });
      // return "Message Sent";

      let query = `INSERT INTO contact (name, email, message) VALUES ("${name}", "${email}", "${message}")`;

      const success = (await contact) && sequelize.query(query);
      if (success) return "Message Sent";
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = { Query, Mutation };
