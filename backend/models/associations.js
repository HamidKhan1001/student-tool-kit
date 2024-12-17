const Country = require('./Country');
const Certification = require('./Certification');
const User = require('./User');
const UserCertification = require('./UserCertification');

const EducationLevel = require('./EducationLevel');
const FieldOfStudy = require('./FieldOfStudy');
const Fee = require('./Fee');
const University = require('./University');
const Questionnaire = require('./Questionnaire');

// Force sync the models in correct order
const initializeDatabase = async () => {
    await Country.sync();
    await EducationLevel.sync();
    await FieldOfStudy.sync();
    await Fee.sync();
    await User.sync();
    // await University.sync();
    
    // Set up associations after tables are created
    University.belongsTo(Country, { foreignKey: 'countryId' });
    Country.hasMany(University, { foreignKey: 'countryId' });

    University.belongsTo(EducationLevel, { foreignKey: 'educationLevelId' });
    EducationLevel.hasMany(University, { foreignKey: 'educationLevelId' });

    University.belongsTo(FieldOfStudy, { foreignKey: 'fieldOfStudyId' });
    FieldOfStudy.hasMany(University, { foreignKey: 'fieldOfStudyId' });

    University.belongsTo(Fee, { foreignKey: 'feeId' });
    Fee.hasMany(University, { foreignKey: 'feeId' });
    // Define relationships
    User.hasOne(Questionnaire);
    Questionnaire.belongsTo(User);

    // Define relationships
    // Set up relationships
    User.belongsToMany(Certification, {
        through: UserCertification,
        foreignKey: 'userId',
        otherKey: 'certificateId'
    });

    Certification.belongsToMany(User, {
        through: UserCertification,
        foreignKey: 'certificateId',
        otherKey: 'userId'
    });

// Add relationships with FieldOfStudy and Country
Questionnaire.belongsTo(FieldOfStudy, { foreignKey: 'fieldOfStudyId' });
Questionnaire.belongsTo(Country, { foreignKey: 'countryId' });
Questionnaire.belongsTo(Fee, { foreignKey: 'feeId' });
Questionnaire.belongsTo(EducationLevel, { foreignKey: 'educationLevelId' });

};

initializeDatabase();

module.exports = {
    Country,
    EducationLevel,
    FieldOfStudy,
    Fee,
    User,
    Certification,
    University,
    Questionnaire,
    UserCertification,
};