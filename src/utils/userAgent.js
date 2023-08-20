

const UserAgent = () => {
    const getOperationSystem = (userAgentHeader) => {
        try {
            let dataWithParenthesis = userAgentHeader.match(/\([^)]*?\)/g);
            let osData = dataWithParenthesis[0].replace(/[()]/g, '').split(/;/);
            
            let os = {
                name: osData[0].trim() || '',
                version: osData[1].trim() || '',
                device: osData[2] || '',
            };
            
            return os;
        } catch (error) {
            throw error;
        }
    };

    const getBrowser = (userAgentHeader) => {
        try {
            let engineRegex = /(AppleWebKit\/(.*)|Gecko\/(.*))+/g;
            let engineMatch = engineRegex.exec(userAgentHeader);
            let engineNameAndVersionOnly = engineMatch[1].substr(0, engineMatch[1].indexOf(" ")).split('/');

            let nameVersionRegex = /(MSIE|Trident|(?!Gecko.+)Firefox|(?!AppleWebKit.+Chrome.+)Safari(?!.+Edge)|(?!AppleWebKit.+)Chrome(?!.+Edge)|(?!AppleWebKit.+Chrome.+Safari.+)Edge|AppleWebKit(?!.+Chrome|.+Safari)|Gecko(?!.+Firefox))(?: |\/)([\d\.apre]+)/g;
            let nameVersion = userAgentHeader.match(nameVersionRegex);
            let nameVersionSplited = nameVersion[0].split('/');

            let browser = {
                name: nameVersionSplited[0] || '',
                version: nameVersionSplited[1] || '',
                engine: engineNameAndVersionOnly[0] || '',
                engine_version: engineNameAndVersionOnly[1] || '',
            };

            return browser;
        } catch (error) {
            throw error;
        }
    }

    return { getOperationSystem, getBrowser };
};

module.exports = UserAgent();