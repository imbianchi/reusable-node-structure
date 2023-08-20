const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class Sessions extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            models.Users.hasMany(models.Sessions, { foreignKey: 'user_id' })
        }
    }

    Sessions.init({
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        userId: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            field: 'user_id'
        },
        osName: {
            type: DataTypes.STRING,
            field: 'os_name',
        },
        osVersion: {
            type: DataTypes.STRING,
            field: 'os_version',
        },
        device: {
            type: DataTypes.STRING,
            field: 'device',
        },
        browser: {
            type: DataTypes.STRING,
            field: 'browser',
        },
        browserVersion: {
            type: DataTypes.STRING,
            field: 'browser_version',
        },
        browserEngine: {
            type: DataTypes.STRING,
            field: 'browser_engine',
        },
        browserEngineVersion: {
            type: DataTypes.STRING,
            field: 'browser_engine_version',
        },
        sessionStartTime: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'session_start_time',
            defaultValue: new Date(),
        },
        sessionEndTime: {
            type: DataTypes.DATE,
            field: 'session_end_time'
        },
        lastActivityTime: {
            type: DataTypes.DATE,
            field: 'last_activity_time'
        },
        sessionType: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'session_type',
            validate: {
                isIn: {
                    args: [['bot', 'person']],
                    msg: "Session type must be 'bot' or 'person'.",
                },
            },
        },
        sessionStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'session_status',
            validate: {
                isIn: {
                    args: [['active', 'inactive', 'deactivated']],
                    msg: "Session status must be 'active', 'inactive' or 'deactivated'.",
                }
            },
        },
        refreshToken: {
            type: DataTypes.TEXT,
            field: "refresh_token",
        },
        ipAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'ip_address',
            validate: {
                isIP: {
                    msg: "IP must be valid.",
                },
            }
        },
        sessionData: {
            type: DataTypes.TEXT,
            field: 'session_data',
            validate: {
                isValidJson: (value) => {
                    try {
                        JSON.parse(value);
                    } catch (e) {
                        return false;
                    }
                    return true;
                },
            }
        },
        botInfo: {
            type: DataTypes.TEXT,
            field: 'bot_info',
            validate: {
                isValidJson: (value) => {
                    try {
                        JSON.parse(value);
                    } catch (e) {
                        return false;
                    }
                    return true;
                },
            }
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
        modelName: 'Sessions',
        deletedAt: true,
    });

    return Sessions;
};
