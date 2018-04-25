import crypto from 'crypto';
const sha1 = function (content) {
    const sha1 = crypto.createHash('sha1');
    sha1.update(content);
    return sha1.digest('hex');
};
const userHelp = {
    encryptionPassword: function (password) {
        return sha1(sha1(password));
    }
};
export default userHelp;
