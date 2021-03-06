// 获取id
function $(id)
{
    return document.getElementById(id);
}
// 改变样式
function changeStyle(id, state, own)
{
    if ( state == true )
    {
        $(id).innerHTML = '√';
        $(id).className = 'ok';
    }
    else
    {
        $(id).innerHTML = 'x';
        $(id).className = 'error';
        own.value = ''; 
    }
}
// 鼠标移入清除输入框后面的提示信息
function clearStyle(t)
{
    // console.log(t.nextElementSibling);  // 获取当前元素的下一个兄弟节点
    var nextSiblingNode = t.nextElementSibling;
    nextSiblingNode.innerHTML = '';
    nextSiblingNode.className = '';
}
// 提示信息
function promptInformation(txt) {
    var prompt = document.getElementsByClassName('prompt')[0];
    var subElement = prompt.children[0];

    subElement.innerHTML = txt;
    prompt.setAttribute('id', 'addAnimation');
    setTimeout("closePrompt()", 1500);
}
// 弹窗隐藏
function closePrompt() {
    var prompt = document.getElementsByClassName('prompt')[0];
    prompt.setAttribute('id', '');
}
// 预先确认
function priorValidation(inputBox, txt)
{
    var input = $(inputBox); 
    if ( input.value == '' )
    {
        promptInformation(txt);
    }
}
// 判断登陆名
function checkName()
{
    var name = $('name');
    var state = true;
    if ( /^[a-zA-Z][a-zA-Z\d]{3,15}$/.test(name.value) )
    {
        state = true;
        changeStyle('landingName', state);
        return state;
    }
    else
    {
        state = false;
        var str = name.value.split('');
        
        if ( str.length < 4 || str.length > 16 )
        {
            promptInformation('登陆名长度过短或超出');
        }
        else if ( !/^[a-zA-Z]/.test(str[0]) )
        {
            promptInformation('登陆名必须以字母开头');
        } 
        else if ( /[^a-zA-Z\d]/.test(name.value) )
        {
            promptInformation('登陆名必须是字母或数字');
        }

        changeStyle('landingName', state, name);
        return state;
    }
}
// 判断登陆密码
function checkPwd()
{
    var pwd = $('logPwd');
    var state = true;
    if ( /^[a-zA-Z\d]{4,10}$/.test(pwd.value) )
    {
        state = true;
        changeStyle('loginPwd', state);
        return state;
    }
    else
    {
        state = false;
        var str = pwd.value.split('');
        if ( str.length < 4 || str.length > 10 )
        {
            promptInformation('密码过短或超出');
        }
        else 
        {
            for ( var i = 0; i < str.length; i ++ )
            {
                if ( /[^a-zA-Z]/.test(str[i]) == false )
                {
                    promptInformation('密码只能由数字/字母组成');
                    break;
                }
            }
        }

        changeStyle('loginPwd', state, pwd);
        return state;
    }
}
// 确认密码
function checkConPwd()
{
    var logPwd = $('logPwd'); // 登陆密码
    var conPwd = $('conPwd'); // 确认密码
    var state = true;
    if ( logPwd.value == conPwd.value )
    {
        state = true;
        changeStyle('confirmPwd', state );   
        changeStyle('loginPwd', state );
        return state;
    }
    else
    {
        state = false;
        var strLogPwd = logPwd.value.split('');
        var strConPwd = conPwd.value.split('');
        if ( strLogPwd.length != strConPwd.length )
        {
            promptInformation('两次密码长度不一致');
        }
        else
        {
            for ( var i = 0; i < strLogPwd.length; i ++ )
            {
                if ( strLogPwd[i] != strConPwd[i] )
                {
                    promptInformation('两次密码输入不一致');
                    break;
                }
            }
        }

        changeStyle('confirmPwd', state, logPwd );   
        changeStyle('loginPwd', state, conPwd );
        return state;
    }
}
// 身份证号码
function checkIDNumber()
{
    var idNumber = $('idNumber');
    var state = true;
    if ( /^[0-9]{17}[0-9|a-zA-z]{1}$/.test(idNumber.value) )
    {
        state = true;
        changeStyle('IDNumber', state );
        return state;
    }
    else
    {
        state = false;
        var str = idNumber.value.split('');
        var strNumber = str.slice(0,17);
        var strLastOne = str.slice(-1);
        
        if ( str.length < 18 || str.length > 18)
        {
            promptInformation('身份证号码过短或过长');
        }
        else if ( /[^0-9|a-zA-z]/.test(strLastOne) )
        {
            promptInformation('身份证号码最后一位必须是数字或字母');
        }
        else
        {
            for ( var i = 0; i < strNumber.length; i ++ )
            {
                if ( /[^0-9]/.test(strNumber[i]) )
                {
                    promptInformation('身份证号码必须为数字(最后一位除外)');
                    break;
                }
            }
        }
        
        changeStyle('IDNumber', state, idNumber );
        return state;
    }
}
// 固定电话
function checkfPhone()
{
    var fPhone = $('fPhone');
    var state = true;
    if ( /^0\d{2,4}-?\d{7,8}$/.test(fPhone.value) )
    {
        state = true;
        changeStyle('fixedLineTelePhone', state );
        return state;
    }
    else
    {
        state = false;
        var str = fPhone.value.split('');
        var areaCode = fPhone.value.split('-');

        if ( str[0] != 0 )
        {
            promptInformation('固定电话必须0开头');
        }
        else if ( areaCode[0].length < 2 || areaCode[0].length > 5 )
        {
            promptInformation('固定电话的区号必须是2~4位的数字');
        }
        else if ( !/^0\d{2,4}-/.test(fPhone.value) )
        {
            promptInformation('固定电话区号后面必须是-连接符');
        }
        else if ( !/^0\d{2,4}-?\d{7,8}/.test(fPhone.value) )
        {
            promptInformation('固定电话连接符后面必须是7位或8位的的数字');
        }
 
        changeStyle('fixedLineTelePhone', state, fPhone);
        return state;
    }
}
// 手机号码
function checkcPhone()
{
    var cPhone = $('cPhone');
    var state = true;
    if ( /^1[3|5|7|8|9][0-9]{9}$/.test(cPhone.value) )
    {
        state = true;
        changeStyle('cellPhoneNumber', state );
        return state;
    }
    else
    {
        state = false;
        var str = cPhone.value.split('');

        if ( str.length < 11 || str.length > 11 )
        {
            promptInformation('手机号码必须是11位');
        }
        else if ( str[0] != 1 )
        {
            promptInformation('手机号码必须是1开头');
        }
        else if ( str[1] != 3 && str[1] != 5 && str[1] != 7 && str[1] != 8 && str[2] != 9 )
        {
            promptInformation('手机号码第二位必须是:3、5、7、8、9中的一个');
        }
        else
        {
            for ( var i = 0; i < str.length; i ++ )
            {
                console.log(/[^0-9]/.test(str[i]));
                if ( /[^0-9]/.test(str[i]) )
                {
                    promptInformation('手机号码必须是数字');
                }
            }
        }
        


        changeStyle('cellPhoneNumber', state, cPhone );
        return state;
    }
}
// 电子邮件，正则表达式：必须以1-9或字母开头；后面接数字或字母2-17位；@分开；后面只能是大小写字母最少1位或多位；再接着.点分开；后面只能是大小写字母最少一位最多10位;
function checkeEmail()
{
    var eEmail = $('eEmail');
    var state = true;
    if ( /^[1-9|a-z|A-Z][0-9a-zA-Z]{2,17}@[a-zA-Z]{1,}\.[a-zA-Z]{1,10}$/.test(eEmail.value) )
    {
        state = true;
        changeStyle('email', state );
        return state;
    }
    else
    {
        state = false;
        var str = eEmail.value.split('');
        console.log(str, eEmail.value);

        // 如果不等于true则提示
        if ( !/[1-9|a-z|A-Z]/.test(str[0]) )
        {
            promptInformation('电子邮件必须以数字1~9或大小写字母开头');
        }
        else if ( !/^[1-9|a-z|A-Z][0-9a-zA-Z]{2,17}/.test(eEmail.value) )
        {
            promptInformation('电子邮件@符前过短或过长(必须是2~17位之间的数字或字母)');
        }
        else if ( !/^[1-9|a-z|A-Z][0-9a-zA-Z]{2,17}@/.test(eEmail.value) )
        {
            promptInformation('电子邮件必须包含@符');
        }
        else if ( !/^[1-9|a-z|A-Z][0-9a-zA-Z]{2,17}@[a-zA-Z]{1,}/.test(eEmail.value) )
        {
            promptInformation('电子邮件@符后必须是1位或多位的数字或字母');
        }
        else if ( !/^[1-9|a-z|A-Z][0-9a-zA-Z]{2,17}@[a-zA-Z]{1,}\./.test(eEmail.value) )
        {
            promptInformation('电子邮件必须包含.点');
        }
        else if ( !/^[1-9|a-z|A-Z][0-9a-zA-Z]{2,17}@[a-zA-Z]{1,}\.[a-zA-Z]{1,10}$/.test(eEmail.value) )
        {
            promptInformation('电子邮件.点后面必须包含1~10位的数字或字母');
        }

        changeStyle('email', state, eEmail );
        return state;
    }
}
// 提交按钮，当提交表单时触发表单的submit事件, 如果返回false,则阻止事件的默认操作(阻止表单提交)
function checkSubmit()
{
    // 校验登陆名
    var result = checkName();
    if ( !result )
    {
        priorValidation('name', '请输入姓名');
        return false; // 不再提交表单
    }
    // 校验登陆密码
    result = checkPwd();
    if ( !result )
    {
        priorValidation('logPwd', '请输入登陆密码');
        return false; 
    } 
    // 校验确认密码
    result = checkConPwd();
    if ( !result )
    {
        priorValidation('conPwd', '请输入确认密码');
        return false; 
    }
    // 校验身份证号码
    result = checkIDNumber()
    if ( !result )
    {
        priorValidation('idNumber', '请输入身份证号码');
        return false; 
    }
    // 校验固定号码
    result = checkfPhone();
    if ( !result )
    {
        priorValidation('fPhone', '请输入固定号码');
        return false; 
    }
    // 校验手机号码
    result = checkcPhone();
    if ( !result )
    {
        priorValidation('cPhone', '请输入手机号码');
        return false; 
    }
    // 校验电子邮件
    result = checkeEmail();
    if ( !result )
    {
        priorValidation('eEmail', '请输入电子邮件');
        return false; 
    }

    return true;
}
// 回车切换到下一个输入框
function pressEnter(ev, input)
{
    // console.log(ev,ev.keyCode); // 获得按下的键
    var ev = ev || event;
    if ( ev.keyCode == 13 )
    {
        ev.preventDefault();    // 阻止默认操作(阻止提交表单), ie9下无效
        input.focus();          // 传入的文本框获得焦点
    }
}
// 获取省份
var sProSelect = $('province');  
// 定义省份数组
var aProArray = [ 
    "北京市", "天津市", "上海市", "重庆市", "河北省", "山西省", "辽宁省", "吉林省", "黑龙江省", "江苏省",
    "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "海南省",
    "四川省", "贵州省", "云南省", "陕西省", "甘肃省", "青海省", "台湾省", "内蒙古自治区", "广西壮族自治区",  "西藏自治区",
    "宁夏回族自治区", "新疆维吾尔自治区", "香港特别行政区", "澳门特别行政区"
 ];      
// 循环给省份下拉列表添加省份
for ( var i = 0; i < aProArray.length; i ++ )
{
    var oOption = document.createElement('option');
    oOption.innerHTML = aProArray[i];
    oOption.value = aProArray[i];
    sProSelect.appendChild(oOption);
}
// 点击省份对应相对应的城市
function changeCity(proSelect)
{
    // 获取选中的省份
    // console.log(proSelect.value, proSelect.selectedIndex, proSelect.options[proSelect.selectedIndex].value);

    var oCitySelect = $('city');
    // 删除原有的城市选项
    oCitySelect.options.length = 1;

    var aCtiyArray = new Array();
    aCtiyArray["北京市"] = [ "朝阳区", "海淀区", "通州区", "房山区", "丰台区", "昌平区", "大兴区", "顺义区", "西城区", "延庆区", "石景山区", "宣武区", "怀柔区", "崇文区", "密云县", "东城区", "门头沟区", "平台区" ];
    aCtiyArray["天津市"] = [ "和平区", "北辰区", "河北区", "河西区", "西青区", "津南区", "东丽区", "武清区", "宝坻区", "红桥区", "大港区", "汉沽区", "静海县", "宁河县", "塘沽区", "蓟县", "南开区", "河东区" ];
    aCtiyArray["上海市"] = [ "松江区", "宝山区", "金山区", "嘉定区", "南汇区", "青浦区", "浦东新区", "奉贤区", "闵行区", "徐汇区", "静安区", "黄浦区", "虹口区", "闸北区", "长宁区", "崇明县", "卢湾县" ];
    aCtiyArray["重庆市"] = [ "江北区", "渝北区", "沙坪坝区", "九龙坡区", "万州区", "永川市", "南岸区", "酉阳县", "北碚区", "涪陵区", "秀山县", "巴南区", "渝中区", "石柱县", "忠县", "合川市", "大渡口区", "开县", "长寿区", "荣昌县", "云阳县", "梁平县", "潼南县", "江津市", "彭水县", "璧山县", "綦江县", "大足县", "黔江区", "巫溪县", "巫山县", "垫江县", "丰都县", "武隆县", "万盛区", "铜梁县", "南川市", "奉节县", "双桥区", "城口县" ];
    aCtiyArray["河北省"] = [ "石家庄市", "唐山市", "保定市", "邯郸市", "邢台区", "河北区", "沧州市", "秦皇岛市", "张家口市", "衡水市", "廊坊市", "承德市" ];
    aCtiyArray["山西省"] = [ "太原市", "大同市",  "运城市", "长治市", "晋城市", "忻州市", "临汾市", "吕梁市", "晋中市", "阳泉市", "朔州市" ];
    aCtiyArray["辽宁省"] = [ "大连市", "沈阳市", "丹东市", "葫芦岛市", "锦州市", "朝阳市", "营口市", "鞍山市", "抚顺市", "本溪市",  "盘锦市", "铁岭市" ];
    aCtiyArray["吉林省"] = [ "吉林市", "长春市", "白山市", "白城市", "延边州", "松原市", "辽原市", "通化市", "四平市" ];
    aCtiyArray["黑龙江省"] = [ "齐齐哈尔市", "哈尔滨市", "大庆市", "佳木斯市", "双鸭山市", "牡丹江市", "鸡西市", "黑河市", "绥化市", "鹤岗市", "伊春市", "大兴安岭地区", "七台河市" ];
    aCtiyArray["江苏省"] = [ "苏州市", "徐州市", "盐城市", "无锡市", "南京市", "南通市", "连云港市", "常州市", "镇江市", "淮安市", "秦州市", "宿迁市" ];
    aCtiyArray["浙江省"] = [ "温州市", "宁波市", "杭州市", "台州市", "嘉兴市", "金华市", "绍兴市", "舟山市", "丽水市", "衢州市" ];
    aCtiyArray["安徽省"] = [ "芜湖市", "合肥市", "六安市", "宿州市", "阜阳市", "安庆市", "马鞍山市", "蚌埠市", "淮北市", "淮南市", "宣城市", "黄山市", "铜陵市", "亳州市", "池州市", "巢湖市", "滁州市" ];
    aCtiyArray["福建省"] = [ "漳州市", "泉州市", "厦门市", "福州市", "莆田市", "宁德市", "三明市", "南平市", "龙岩市" ];
    aCtiyArray["江西省"] = [ "南昌市", "赣州市", "上饶市", "吉安市", "九江市", "新余市", "抚州市", "宜春市", "景德镇市", "萍乡市", "鹰潭市" ];
    aCtiyArray["山东省"] = [ "济南市", "青岛市", "临沂市", "济宁市", "菏泽市", "烟台市", "泰安市", "淄博市", "潍坊市", "日照市", "威海市", "滨州市", "东营市", "聊城市", "德州市", "莱芜市", "枣庄市" ];
    aCtiyArray["河南省"] = [ "郑州市", "南阳市", "新乡市", "安阳市", "洛阳市", "信阳市", "平顶山市", "周口市", "商丘市", "开封市", "驻马店市", "濮阳市", "三门峡市", "漯河市", "许昌市", "鹤壁市", "济源市" ];
    aCtiyArray["湖北省"] = [ "武汉市", "宜昌市", "襄樊市", "荆州市", "恩施州", "孝感市", "黄冈市", "十堰市", "咸宁市", "黄石市", "仙桃市", "随州市", "天门市", "荆门市", "潜江市", "鄂州市", "神农架林区" ];
    aCtiyArray["湖南省"] = [ "长沙市", "邵阳市", "常德市", "衡阳市", "株洲市", "湘潭市", "永州市", "岳阳市", "怀化市", "郴州市", "娄底市", "益阳市", "张家界市", "湘西州" ];
    aCtiyArray["广东省"] = [ "东莞市", "广州市", "中山市", "深圳市", "惠州市", "江门市", "珠海市", "汕头市", "佛山市", "湛江市", "河源市", "肇庆市", "潮州市", "清远市", "韶关市", "揭阳市", "阳江市", "云浮市", "茂名市", "梅州市", "汕尾市" ];
    aCtiyArray["海南省"] = [ "三亚市", "海口市", "琼海市", "文昌市", "东方市", "昌江县", "陵水县", "乐东县", "五指山市", "保亭县", "澄迈县", "万宁市", "儋州市", "临高县", "白沙县", "定安县", "琼中县", "屯昌县" ];
    aCtiyArray["四川省"] = [ "成都市", "绵阳市", "广元市", "达州市", "南充市", "德阳市", "广安市", "阿坝州", "巴中市", "遂宁市", "内江市", "凉山州", "攀枝花市", "乐山市", "自贡市", "泸州市", "雅安市", "宜宾市", "资阳市", "眉山市", "甘孜州" ];
    aCtiyArray["贵州省"] = [ "贵阳市", "黔东南州", "黔南州", "遵义市", "黔西南州", "毕节地区", "铜仁地区", "安顺市", "六盘水市" ];
    aCtiyArray["云南省"] = [ "昆明市", "红河州", "大理州", "文山州", "德宏州", "曲靖市", "邵通市", "楚雄州", "保山市", "玉溪市", "丽江地区", "临沧地区", "思茅地区", "西双版纳州", "怒江州", "迪庆州" ];
    aCtiyArray["陕西省"] = [ "西安市", "咸阳市", "宝鸡市", "汉中市", "渭南市", "安康市", "榆林市", "商洛市", "延安市", "铜川市" ];
    aCtiyArray["甘肃省"] = [ "兰州市", "天水市", "庆阳市", "武威市", "酒泉市", "张掖市", "陇南地区", "白银市", "定西地区", "平凉市", "嘉峪关市", "临夏回族自治州", "金昌市", "甘南州" ];
    aCtiyArray["青海省"] = [ "西宁市", "海西州", "海东地区", "海北州", "果洛州", "玉树州", "黄南藏族自治州" ];
    aCtiyArray["台湾省"] = [ "台北市", "高雄市", "台中市", "新竹市", "基隆市", "台南市", "嘉义市" ];
    aCtiyArray["内蒙古自治区"] = [ "赤峰市", "包头市", "通辽市", "呼和浩特市", "乌海市", "鄂尔多斯市", "呼伦贝尔市", "兴安盟", "巴彦淖尔盟", " 乌兰察布盟", "锡林郭勒盟", "阿拉善盟" ];
    aCtiyArray["广西壮族自治区"] = [ "贵港市", "玉林市", "北海市", "南宁市", "柳州市", "桂林市", "梧州市", "钦州市", "来宾市", "河池市", "百色市", "贺州市", "崇左市", "防城港市" ];
    aCtiyArray["西藏自治区"] = [ "拉萨市", "山南地区", "林芝地区", "日喀则地区", "阿里地区", "昌都地区", "那曲地区" ];
    aCtiyArray["宁夏回族自治区"] = [ "银川市", "吴忠市", "中卫市", "石嘴山市", "固原市" ];
    aCtiyArray["新疆维吾尔自治区"] = [ "乌鲁木齐市", "伊犁州", "昌吉州", "石河子市", "哈密地区", "阿克苏地区", "巴英郭愣州", "哈什地区", "塔城地区", "克拉玛依市", "和田地区", "阿勒泰州", "吐鲁番地区", "阿拉尔市", "博尔塔拉州", "五家渠市", "克孜勒苏州", "图木舒克市" ];
    aCtiyArray["香港特别行政区"] = [ "香港" ];
    aCtiyArray["澳门特别行政区"] = [ "澳门" ];

    var oProvince = proSelect.value;
    var city = aCtiyArray[oProvince];

    for ( var i = 0; i < city.length; i ++ )
    {
        var oOption = document.createElement('option');
        oOption.innerHTML = city[i];
        oOption.value = city[i];
        oCitySelect.appendChild(oOption);
    }
}