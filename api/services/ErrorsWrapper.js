module.exports = {
    wrap:function(errors){
        var wrappedErrors = [];
        for (var field in errors) {
            wrappedErrors.push({
                field:field,
                message:errors[field][0].message
            });
        }
        return wrappedErrors;
    }
};