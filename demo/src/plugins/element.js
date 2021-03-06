import Vue from 'vue'
import { Button, Form, FormItem, Input, Container, Header, Main, Aside, Menu, Submenu, MenuItem, MenuItemGroup
,Breadcrumb, BreadcrumbItem,Card,Row,Col, Table,TableColumn, Switch ,Tooltip,Pagination,Dialog,Tag,Drawer} from 'element-ui'
import { RadioGroup, Radio, RadioButton, DatePicker, Icon, TimeSelect, Progress, TimePicker, Tabs, TabPane} from "element-ui";
//设置消息提示组件
import { Message } from 'element-ui';

Vue.use(Button)
Vue.use(Form)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Drawer)

Vue.use(Radio)
Vue.use(RadioButton)
Vue.use(RadioGroup)
Vue.use(DatePicker)
Vue.use(Icon)
Vue.use(TimeSelect)
Vue.use(Progress)
Vue.use(TimePicker)
Vue.use(Tabs)
Vue.use(TabPane)

Vue.prototype.$message=Message;
