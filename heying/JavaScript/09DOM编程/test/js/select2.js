// 第二种改进方法：将每个省份的城市选项放在二维数组中,对应省份的索引，下标使用数字表示

var sProSelect = document.getElementById('province');   // 获取省份
var aProArray = [ '安徽省', '浙江省'];      // 定义省份数组

for ( var i = 0; i < aProArray.length; i ++ )
{
    var oOption = document.createElement('option');
    oOption.innerHTML = aProArray[i];
    oOption.value = aProArray[i];
    sProSelect.appendChild(oOption);
}

function changeCity(proSelect)
{
    // 获取选中的省份
    console.log(proSelect.value, proSelect.selectedIndex, proSelect.options[proSelect.selectedIndex].value);

    var oCitySelect = document.getElementById('city');
    // 删除原有的城市选项
    oCitySelect.options.length = 1;

    var aCtiyArray = new Array();
    aCtiyArray[0] = ['合肥市', '六安市'];
    aCtiyArray[1] = ['杭州市', '金华市'];

    // 减一是去除下拉提示框中的第一行的提示语
    var index = proSelect.selectedIndex - 1;
    var city = aCtiyArray[index];
    console.log(city);
   
    for ( var i = 0; i < city.length; i ++ )
    {
        var oOption = document.createElement('option');
        oOption.innerHTML = city[i];
        oOption.value = city[i];
        oCitySelect.appendChild(oOption);
    }
}