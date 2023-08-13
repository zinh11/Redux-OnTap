import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, notification } from 'antd';
import { useAddProductMutation } from '../../../services/product.service';

const ProductAdd = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm();
    const [addProduct] = useAddProductMutation()
    const onFinish = (values: any) => {
        console.log(values);
        addProduct(values)
        navigate('/');
        notification.success({
            message: 'Add Successful',
            description: `The product ${values.name} has been add.`,
            duration: 2
        });
    };

    return (
        <div>
            <Form form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 500, margin: '0 auto' }}
                onFinish={onFinish} >
                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your Name Product!' }, { min: 5, message: 'Product Name must be at least 5 characters.' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                        { required: true, message: 'Please input your Price Product!' },
                        {
                            validator: (_, value) => {
                                if (!value || !isNaN(Number(value))) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Price must be a number');
                            }
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Add Product
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ProductAdd