/* eslint-disable prettier/prettier */
export const httpStatusCode = {
    100: { errCode: "100", message: 'Continue' },
    101: { errCode: "101", message: 'SwitchingProtocols' },
    102: { errCode: "102", message: 'Processing' },
    103: { errCode: "103", message: 'EarlyHints' },
    200: { errCode: "200", message: 'Ok' },
    201: { errCode: "201", message: 'Created' },
    202: { errCode: "202", message: 'Accepted' },
    203: { errCode: "203", message: 'NonAuthoritativeInformation' },
    204: { errCode: "204", message: 'NoContent' },
    205: { errCode: "205", message: 'ResetContent' },
    206: { errCode: "206", message: 'PartialContent' },
    207: { errCode: "207", message: 'MultierrCode' },
    208: { errCode: "208", message: 'AlreadyReported' },
    226: { errCode: "226", message: 'ImUsed' },
    300: { errCode: "300", message: 'MultipleChoices' },
    301: { errCode: "301", message: 'MovedPermanently' },
    302: { errCode: "302", message: 'Found' },
    303: { errCode: "303", message: 'SeeOther' },
    304: { errCode: "304", message: 'NotModified' },
    305: { errCode: "305", message: 'UseProxy' },
    306: { errCode: "306", message: 'Unused' },
    307: { errCode: "307", message: 'TemporaryRedirect' },
    308: { errCode: "308", message: 'PermanentRedirect' },
    400: { errCode: "400", message: 'BadRequest' },
    401: { errCode: "401", message: 'Unauthorized' },
    402: { errCode: "402", message: 'PaymentRequired' },
    403: { errCode: "403", message: 'Forbidden' },
    404: { errCode: "404", message: 'NotFound' },
    405: { errCode: "405", message: 'MethodNotAllowed' },
    406: { errCode: "406", message: 'NotAcceptable' },
    407: { errCode: "407", message: 'ProxyAuthenticationRequired' },
    408: { errCode: "408", message: 'RequestTimeout' },
    409: { errCode: "409", message: 'Conflict' },
    410: { errCode: "410", message: 'Gone' },
    411: { errCode: "411", message: 'LengthRequired' },
    412: { errCode: "412", message: 'PreconditionFailed' },
    413: { errCode: "413", message: 'PayloadTooLarge' },
    414: { errCode: "414", message: 'UriTooLong' },
    415: { errCode: "415", message: 'UnsupportedMediaType' },
    416: { errCode: "416", message: 'RangeNotSatisfiable' },
    417: { errCode: "417", message: 'ExpectationFailed' },
    418: { errCode: "418", message: 'ImATeapot' },
    421: { errCode: "421", message: 'MisdirectedRequest' },
    422: { errCode: "422", message: 'UnprocessableEntity' },
    423: { errCode: "423", message: 'Locked' },
    424: { errCode: "424", message: 'FailedDependency' },
    425: { errCode: "425", message: 'TooEarly' },
    426: { errCode: "426", message: 'UpgradeRequired' },
    428: { errCode: "428", message: 'PreconditionRequired' },
    429: { errCode: "429", message: 'TooManyRequests' },
    431: { errCode: "431", message: 'RequestHeaderFieldsTooLarge' },
    451: { errCode: "451", message: 'UnavailableForLegalReasons' },
    500: { errCode: "500", message: 'InternalServerError' },
    501: { errCode: "501", message: 'NotImplemented' },
    502: { errCode: "502", message: 'BadGateway' },
    503: { errCode: "503", message: 'ServiceUnavailable' },
    504: { errCode: "504", message: 'GatewayTimeout' },
    505: { errCode: "505", message: 'HttpVersionNotSupported' },
    506: { errCode: "506", message: 'VariantAlsoNegotiates' },
    507: { errCode: "507", message: 'InsufficientStorage' },
    508: { errCode: "508", message: 'LoopDetected' },
    510: { errCode: "510", message: 'NotExtended' },
    511: { errCode: "511", message: 'NetworkAuthenticationRequired' },
}

export const globalErrCode = {
    "STUDENT.0001": { status: 404, errCode: "STUDENT.0001", message: 'Some Student Not Found' },
    "STUDENT.0002": { status: 404, errCode: "STUDENT.0002", message: 'Student Not Found' },

    "TEACHER.0001": { status: 404, errCode: "TEACHER.0001", message: 'Teacher Not Found' },
    "TEACHER.0002": { status: 404, errCode: "TEACHER.0002", message: 'Some Teacher Not Found' },

}
