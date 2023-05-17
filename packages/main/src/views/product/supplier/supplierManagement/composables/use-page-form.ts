import {
  SettlementMethodEnum,
  PaymentMethodEnum,
} from '@/enums/product/supplier/supplierManagement'
import {
  CustomInput,
  CustomDividerLine,
  CustomDividerLineValueEnum,
  CustomSingleSelect,
  CustomTextarea,
} from '@/models/formItems'

interface IFormConfig {
  [key: string]: any
}

export default function (data: { [key: string]: any } = {}, formConfig: IFormConfig = {}) {
  return {
    list: [
      new CustomDividerLine({
        prop: 'basicInformation',
        label: '基础信息',
        value: CustomDividerLineValueEnum.THIN,
      }),
      new CustomInput({
        label: '名称',
        prop: 'SupplierName',
        value: data.SupplierName,
        rules: [
          {
            required: true,
            message: '名称不允许为空',
            trigger: 'change',
          },
        ],
      }),
      new CustomInput({
        label: '到货周期',
        prop: 'ArrivalPeriod',
        value: data.ArrivalPeriod,
        append: '天',
      }),
      new CustomInput({
        label: '产品网址',
        prop: 'WebSite',
        value: data.WebSite,
      }),
      new CustomTextarea({
        label: '地址',
        prop: 'SupplierAddress',
        value: data.SupplierAddress,
      }),
      new CustomTextarea({
        label: '备注',
        prop: 'Remark',
        value: data.Remark,
      }),
      new CustomDividerLine({
        prop: 'contactInformation',
        label: '联系信息',
        value: CustomDividerLineValueEnum.THIN,
      }),
      new CustomInput({
        label: '联系人',
        prop: 'Contacts',
        value: data.Contacts,
      }),
      new CustomInput({
        label: '手机',
        prop: 'MobilePhone',
        value: data.MobilePhone,
      }),
      new CustomInput({
        label: '电话',
        prop: 'Telephone',
        value: data.Telephone,
      }),
      new CustomInput({
        label: 'QQ',
        prop: 'QQ',
        value: data.QQ,
      }),
      new CustomInput({
        label: '邮箱',
        prop: 'Mailbox',
        value: data.Mailbox,
      }),
      new CustomInput({
        label: '旺旺',
        prop: 'Wangwang',
        value: data.Wangwang,
      }),
      new CustomDividerLine({
        prop: 'financialInformation',
        label: '财务信息',
        value: CustomDividerLineValueEnum.THIN,
      }),
      new CustomSingleSelect({
        label: '结算方式',
        value: data.SettlementMethod,
        prop: 'SettlementMethod',
        options: Object.keys(SettlementMethodEnum)
          .filter((key) => Number.isNaN(Number(key)))
          .map((key) => ({
            value: Number(SettlementMethodEnum[key]),
            label: key,
          })),
      }),
      new CustomSingleSelect({
        label: '支付方式',
        value: data.PaymentMethod,
        prop: 'PaymentMethod',
        options: Object.keys(PaymentMethodEnum)
          .filter((key) => Number.isNaN(Number(key)))
          .map((key) => ({
            value: Number(PaymentMethodEnum[key]),
            label: key,
          })),
      }),
      new CustomInput({
        label: '银行名称',
        prop: 'BankName',
        value: data.BankName,
      }),
      new CustomInput({
        label: '银行账号',
        prop: 'BankAccount',
        value: data.BankAccount,
      }),
      new CustomInput({
        label: '开户人名称',
        prop: 'AccountUserName',
        value: data.AccountUserName,
      }),
    ],
  }
}
