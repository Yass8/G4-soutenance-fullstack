import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'process';
import Sequelize, { DataTypes } from 'sequelize';

import userModel from './user.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lire et parser config.json
const env = process.env.NODE_ENV || 'development';
const rawConfig = fs.readFileSync(new URL('../config/config.json', import.meta.url));
const config = JSON.parse(rawConfig)[env];

// Crée la connexion Sequelize
const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);

const db = {};

// Initialiser les modèles manuellement
db.User = userModel(sequelize, DataTypes);

// Ajouter les associations si définies
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
