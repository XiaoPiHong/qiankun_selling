import { SingleSelect, SearchKeyInput, RangeInput } from '@/models/searchFormItems'
import {
  SettlementMethodEnum,
  PaymentMethodEnum,
} from '@/enums/product/supplier/supplierManagement'

export default function (formConfig: { [key: string]: any } = {}) {
  const { searchKeyInput } = formConfig
  return {
    list: [
      new SingleSelect({
        prop: 'SettlementMethod',
        placeholder: '结算方式',
        options: Object.keys(SettlementMethodEnum)
          .filter((key) => Number.isNaN(Number(key)))
          .map((key) => ({
            value: SettlementMethodEnum[key],
            label: key,
            operate: 'eq',
            tname: 's',
            cname: 'SettlementMethod',
          })),
      }),
      new SingleSelect({
        prop: 'PaymentMethod',
        placeholder: '支付方式',
        options: Object.keys(PaymentMethodEnum)
          .filter((key) => Number.isNaN(Number(key)))
          .map((key) => ({
            value: PaymentMethodEnum[key],
            label: key,
            operate: 'eq',
            tname: 's',
            cname: 'PaymentMethod',
          })),
      }),
      new SearchKeyInput({
        prop: 'SearchKeyInput',
        options: [
          {
            value: 'SupplierName',
            label: '供应商名称',
            cname: 'SupplierName',
            tname: 's',
            operate: 'like',
          },
          {
            value: 'Contacts',
            label: '联系人',
            cname: 'Contacts',
            tname: 's',
            operate: 'like',
          },
          {
            value: 'MobilePhone',
            label: '手机',
            cname: 'MobilePhone',
            tname: 's',
            operate: 'like',
          },
          {
            value: 'Telephone',
            label: '电话',
            cname: 'Telephone',
            tname: 's',
            operate: 'like',
          },
          { value: 'QQ', label: 'QQ', cname: 'QQ', tname: 's', operate: 'like' },
          {
            value: 'Mailbox',
            label: '邮箱',
            cname: 'Mailbox',
            tname: 's',
            operate: 'like',
          },
          {
            value: 'Wangwang',
            label: '旺旺',
            cname: 'Wangwang',
            tname: 's',
            operate: 'like',
          },
          {
            value: 'BankName',
            label: '银行名称',
            cname: 'BankName',
            tname: 's',
            operate: 'like',
          },
          {
            value: 'BankAccount',
            label: '银行账号',
            cname: 'BankAccount',
            tname: 's',
            operate: 'like',
          },
          {
            value: 'AccountUserName',
            label: '开户人名称',
            cname: 'AccountUserName',
            tname: 's',
            operate: 'like',
          },
          {
            value: 'WebSite',
            label: '产品网址',
            cname: 'WebSite',
            tname: 's',
            operate: 'like',
          },
          {
            value: 'SupplierAddress',
            label: '地址',
            cname: 'SupplierAddress',
            tname: 's',
            operate: 'like',
          },
          {
            value: 'Remark',
            label: '备注',
            cname: 'Remark',
            tname: 's',
            operate: 'like',
          },
        ],
        value: { key: 'SupplierName', value: '' },
        ...searchKeyInput,
      }),
      new RangeInput({
        prop: 'ArrivalPeriod',
        prePlaceholder: '>=',
        appendPlaceholder: '<=',
        options: [
          {
            value: 'ArrivalPeriod',
            label: '到货周期（天）',
            cname: 'ArrivalPeriod',
            tname: 's',
          },
        ],
        preOption: { operate: 'GreatEq' },
        appendOption: { operate: 'LessEq' },
        value: { key: 'ArrivalPeriod', value: ['', ''] },
        hidden: true,
      }),
    ],
  }
}
