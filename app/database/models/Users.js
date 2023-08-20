const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            models.Sessions.belongsTo(models.Users, { foreignKey: 'user_id' });
        }
    }

    Users.init({
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "full_name",
            validate: {
                notNull: {
                    msg: "User full name must be provided",
                }
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: "User username/nickname must be provided",
                }
            }
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'guest',
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: {
                    args: [['bot', 'person']],
                    msg: "User type must be 'bot' or 'person'.",
                }
            },
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'inactive',
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "Email must be valid.",
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            field: 'created_at',
            defaultValue: new Date(),
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at'
        },
    }, {
        sequelize,
        modelName: 'Users',
    });

    return Users;
};
