import mongoose from "mongoose";

const { db, environment } = useRuntimeConfig();

const connectURI = {
  development: `mongodb://${db.host}:${db.port}/${db.database}`,
  production: `mongodb+srv://${db.user}:${db.password}@${db.host}/?retryWrites=true&w=majority`
};

export default async () => {
  try {
    console.log('connecting to db...');
    await mongoose.connect(connectURI[environment]);
    console.log("DB connection established.");
  } catch (err) {
    console.warn("DB connection failed.", err);
  }
};
