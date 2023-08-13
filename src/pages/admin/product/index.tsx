import React, { useState } from 'react';
import type { TableProps } from 'antd';
import { Table, Button, Popconfirm, notification, Input } from 'antd';
import { CloseOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType, FilterValue, SorterResult } from 'antd/es/table/interface';
import { IProducts } from '../../../types/product';
import { Link } from 'react-router-dom';
import { useFetchProductQuery, useRemoveProductMutation } from '../../../services/product.service';




const Dashboard: React.FC = () => {
    const { data, isLoading } = useFetchProductQuery();
    const [sortedInfo, setSortedInfo] = useState<SorterResult<IProducts>>({});
    const handleChange: TableProps<IProducts>['onChange'] = (pagination, filters, sorter) => {
        setSortedInfo(sorter as SorterResult<IProducts>);
    };
    const [remove] = useRemoveProductMutation()
    const removeProduct = (id: number) => {
        remove(id);
    }
    const columns: ColumnsType<IProducts> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
            sortOrder: sortedInfo.columnKey === 'price' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (record) =>
                <span>
                    <Popconfirm
                        title="Are you sure to remove this item?"
                        onConfirm={() => {
                            removeProduct(record.id); notification.success({
                                message: 'Remove',
                                description: (
                                    <span>
                                        Product <b>{record.name}</b> remove successfully!
                                    </span>
                                )
                            });
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" style={{ backgroundColor: 'red', margin: '4px', minWidth: '8em' }}>
                            <CloseOutlined /> Remove
                        </Button>
                    </Popconfirm>
                    <Button type="primary" style={{ backgroundColor: 'green', margin: '4px', minWidth: '8em' }}><Link to={record.id + '/edit'}><EditOutlined /> Update</Link></Button>
                </span>
        },
    ];

    return (
        <div>
            <Button type="primary" style={{ backgroundColor: 'green', margin: '4px', minWidth: '8em' }}><Link to={'add'}><EditOutlined />ADD</Link></Button>
            <Table columns={columns} dataSource={data} onChange={handleChange} />
        </div>
    );
};

export default Dashboard;