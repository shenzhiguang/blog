// 封装提交表单对象
function serializeToJson(form) {
    var result = {};
    // 获取到表单中用户输入的内容
    // serializeArray()
    // [{name: 'email', value: '用户输入的内容'}]
    form = form.serializeArray();
    form.forEach((item) => {
        result[item.name] = item.value;
    });
    return result;
}