from flask import Flask, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Database Configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'medicine_management'
}

# Database Connection
def get_db_connection():
    return mysql.connector.connect(**db_config)

# REGISTER STORE
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    store_name = data.get('store_name')
    password = data.get('password')

    if not store_name or not password:
        return "Invalid Input", 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        query = "INSERT INTO stores (store_name, password) VALUES (%s, %s)"
        cursor.execute(query, (store_name, password))
        conn.commit()
        response = 'New record created successfully'
    except mysql.connector.Error as err:
        print(f"Database error: {err}")
        response = 'Database query error'
    finally:
        cursor.close()
        conn.close()

    return response


# LOGIN STORE
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    store_name = data.get('store_name')
    password = data.get('password')
    print(store_name ,password )
    if not store_name or not password:
        return "Invalid Input", 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = "SELECT * FROM stores WHERE store_name=%s AND password=%s"
    cursor.execute(query, (store_name, password))
    result = cursor.fetchone()

    cursor.close()
    conn.close()

    if result:
        return {
        "status": "success",
        "id": result["id"],
        "store_name": result["store_name"]
    }
    else:
        return {
            "status": "failure"
        }

#dashboard 
@app.route('/dashboard/<int:store_id>', methods=['GET'])
def dashboard(store_id):

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT COUNT(*) FROM medicines WHERE store_id=%s",
        (store_id,)
    )
    total = cursor.fetchone()[0]

    cursor.execute(
        "SELECT COUNT(*) FROM medicines WHERE stock < 10 AND store_id=%s",
        (store_id,)
    )
    low_stock = cursor.fetchone()[0]

    cursor.execute(
        "SELECT COUNT(*) FROM medicines WHERE stock = 0 AND store_id=%s",
        (store_id,)
    )
    out_of_stock = cursor.fetchone()[0]

    cursor.execute(
        "SELECT COUNT(*) FROM medicines WHERE expiry_date < CURDATE() AND store_id=%s",
        (store_id,)
    )
    expired = cursor.fetchone()[0]

    cursor.close()
    conn.close()

    return {
        "total_medicines": total,
        "low_stock_medicines": low_stock,
        "out_of_stock_medicines": out_of_stock,
        "expired_medicines": expired
    }

#add medicine
@app.route('/add-medicine', methods=['POST'])
def add_medicine():

    data = request.get_json()

    price = data.get('price')
    stock = data.get('stock')
    expiry_date = data.get('expiry_date')
    medicine_name = data.get('medicine_name')
    category = data.get('category')
    ndc_code = data.get('ndc_code')
    reorder_level = data.get('reorder_level')
    store_id = data.get('store_id')

    if not medicine_name:
        return "Invalid Input", 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:

        query = """
INSERT INTO medicines
(
medicine_name,
category,
price,
stock,
expiry_date,
store_id,
ndc_code,
reorder_level
)
VALUES (%s,%s,%s,%s,%s,%s,%s,%s)
"""

        cursor.execute(
    query,
    (
        medicine_name,
        category,
        price,
        stock,
        expiry_date,
        store_id,
        ndc_code,
        reorder_level
    )
)

        conn.commit()

        return "Medicine Added Successfully"

    except mysql.connector.Error as err:
        print(err)
        return "Database Error"

    finally:
        cursor.close()
        conn.close()
# add batch
@app.route('/add-batch', methods=['POST'])
def add_batch():

    data = request.get_json()
    
    medicine_id = data.get('medicine_id')
    batch_no = data.get('batch_no')
    rack_no = data.get('rack_no')
    mfg_date = data.get('mfg_date')
    exp_date = data.get('exp_date')
    hsn_code = data.get('hsn_code')
    quantity = data.get('quantity')
    free_quantity = data.get('free_quantity')
    unit_per_pack = data.get('unit_per_pack')
    rate_per_quantity = data.get('rate_per_quantity')
    gst = data.get('gst')
    mrp = data.get('mrp')
    profit = data.get('profit')
    purchase_date = data.get('purchase_date')
    supplier_phone = data.get('supplier_phone')
    payment_id = data.get('payment_id')

    conn = get_db_connection()
    cursor = conn.cursor()

    try:

        query = """
        INSERT INTO batches
        (
            medicine_id,
            batch_no,
            rack_no,
            mfg_date,
            exp_date,
            hsn_code,
            quantity,
            free_quantity,
            unit_per_pack,
            rate_per_quantity,
            gst,
            mrp,
            profit,
            purchase_date,
            supplier_phone
        )
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        """

        cursor.execute(
            query,
            (
                medicine_id,
                batch_no,
                rack_no,
                mfg_date,
                exp_date,
                hsn_code,
                quantity,
                free_quantity,
                unit_per_pack,
                rate_per_quantity,
                gst,
                mrp,
                profit,
                purchase_date,
                supplier_phone
            )
        )

        conn.commit()

        return "Batch Added Successfully"

    except mysql.connector.Error as err:
        print(err)
        return "Database Error"

    finally:
        cursor.close()
        conn.close()

#view
@app.route('/view-medicines/<int:store_id>', methods=['GET'])
def view_medicines(store_id):

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = "SELECT * FROM medicines WHERE store_id=%s"

    cursor.execute(query,(store_id,))

    medicines = cursor.fetchall()

    cursor.close()
    conn.close()

    return medicines

#del
@app.route('/delete-medicine/<int:id>', methods=['DELETE'])
def delete_medicine(id):

    conn = get_db_connection()
    cursor = conn.cursor()

    query = "DELETE FROM medicines WHERE id = %s"

    cursor.execute(query, (id,))

    conn.commit()

    cursor.close()
    conn.close()

    return "Medicine Deleted Successfully"

#edit medicine
@app.route('/medicine/<int:id>', methods=['GET'])
def get_medicine(id):

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = "SELECT * FROM medicines WHERE id=%s"

    cursor.execute(query, (id,))

    medicine = cursor.fetchone()

    cursor.close()
    conn.close()

    return medicine

#update
@app.route('/update-medicine/<int:id>', methods=['PUT'])
def update_medicine(id):

    data = request.get_json()

    medicine_name = data.get('medicine_name')
    category = data.get('category')
    price = data.get('price')
    stock = data.get('stock')
    expiry_date = data.get('expiry_date')

    conn = get_db_connection()
    cursor = conn.cursor()

    query = """
    UPDATE medicines
    SET
        medicine_name=%s,
        category=%s,
        price=%s,
        stock=%s,
        expiry_date=%s
    WHERE id=%s
    """

    cursor.execute(
        query,
        (
            medicine_name,
            category,
            price,
            stock,
            expiry_date,
            id
        )
    )

    conn.commit()

    cursor.close()
    conn.close()

    return "Medicine Updated Successfully"

#profile info 
@app.route('/save-profile', methods=['POST'])
def save_profile():

    data = request.get_json()

    store_id = data.get('store_id')
    owner_name = data.get('owner_name')
    phone = data.get('phone')
    email = data.get('email')
    address = data.get('address')

    conn = get_db_connection()
    cursor = conn.cursor()

    query = """
    UPDATE stores
    SET
        owner_name=%s,
        phone=%s,
        email=%s,
        address=%s
    WHERE id=%s
    """

    cursor.execute(
        query,
        (
            owner_name,
            phone,
            email,
            address,
            store_id
        )
    )

    conn.commit()

    cursor.close()
    conn.close()

    return "Profile Saved Successfully"

@app.route('/profile/<int:store_id>', methods=['GET'])
def get_profile(store_id):

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
    SELECT
        store_name,
        owner_name,
        phone,
        email,
        address
    FROM stores
    WHERE id=%s
    """

    cursor.execute(query, (store_id,))

    profile = cursor.fetchone()

    cursor.close()
    conn.close()

    return profile

from flask import jsonify

@app.route('/medicines/<int:store_id>', methods=['GET'])
def get_medicines(store_id):

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("""
            SELECT id, medicine_name
            FROM medicines
            WHERE store_id = %s
        """, (store_id,))

        data = cursor.fetchall()

        return jsonify(data)   # ✅ MUST BE JSON

    except Exception as e:
        print(e)
        return jsonify([])     # ❗ return empty list, NOT text

    finally:
        cursor.close()
        conn.close()

#batch history
@app.route('/batch-history/<int:medicine_id>', methods=['GET'])
def batch_history(medicine_id):

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:

        query = """
        SELECT *
        FROM batches
        WHERE medicine_id = %s
        """

        cursor.execute(query, (medicine_id,))

        batches = cursor.fetchall()

        return jsonify(batches)

    except Exception as e:
        print(e)
        return "Error Fetching Batch History", 500

    finally:
        cursor.close()
        conn.close()
# generate bill
@app.route('/generate-bill', methods=['POST'])
def generate_bill():

    data = request.get_json()

    customer_name = data.get('customer_name')
    total_amount = data.get('total_amount')
    payment_id = data.get('payment_id')
    bill_items = data.get('bill_items')

    conn = get_db_connection()
    cursor = conn.cursor()

    try:

        # Save main bill
        cursor.execute(
            """
            INSERT INTO bills
            (customer_name, total_amount, payment_id)
            VALUES (%s, %s, %s)
            """,
            (customer_name, total_amount, payment_id)
        )

        bill_id = cursor.lastrowid

        # Save bill items
        for item in bill_items:

            cursor.execute(
                """
                INSERT INTO bill_items
                (bill_id, medicine_name, quantity, price, total)
                VALUES (%s, %s, %s, %s, %s)
                """,
                (
                    bill_id,
                    item['medicine_name'],
                    item['quantity'],
                    item['price'],
                    item['total']
                )
            )

            # Reduce stock
            cursor.execute(
                """
                UPDATE medicines
                SET stock = stock - %s
                WHERE medicine_name = %s
                """,
                (
                    item['quantity'],
                    item['medicine_name']
                )
            )

        conn.commit()

        return {
            "status": "success",
            "bill_id": bill_id
        }

    except Exception as e:

        print(e)

        return {
            "status": "error"
        }

    finally:

        cursor.close()
        conn.close()

# bill history display
@app.route('/bill-history', methods=['GET'])
def bill_history():

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT *
        FROM bills
        ORDER BY id DESC
        """
    )

    bills = cursor.fetchall()

    cursor.close()
    conn.close()

    return bills

    
@app.route('/bill/<int:bill_id>')
def get_bill(bill_id):

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:

        cursor.execute(
            """
            SELECT *
            FROM bills
            WHERE id = %s
            """,
            (bill_id,)
        )

        bill = cursor.fetchone()

        cursor.execute(
            """
            SELECT *
            FROM bill_items
            WHERE bill_id = %s
            """,
            (bill_id,)
        )

        items = cursor.fetchall()

        return {
            "bill": bill,
            "items": items
        }

    except Exception as e:

        print(e)

        return {
            "error": str(e)
        }

    finally:

        cursor.close()
        conn.close()

@app.route('/admin-total-stores', methods=['GET'])
def admin_total_stores():

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    try:

        cursor.execute(
            "SELECT COUNT(*) AS total_stores FROM stores"
        )

        result = cursor.fetchone()

        return jsonify(result)

    except Exception as e:

        print(e)
        return "Error Fetching Store Count", 500

    finally:

        cursor.close()
        conn.close()
# admin create store
@app.route('/create-store', methods=['POST'])
def create_store():
    data = request.get_json()

    store_name = data.get('store_name')
    password = data.get('password')
    owner_name = data.get('owner_name')
    phone = data.get('phone')
    email = data.get('email')
    address = data.get('address')

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        query = """
        INSERT INTO stores 
        (store_name, password, owner_name, phone, email, address)
        VALUES (%s, %s, %s, %s, %s, %s)
        """

        cursor.execute(query, (
            store_name,
            password,
            owner_name,
            phone,
            email,
            address
        ))

        conn.commit()
        return {"message": "Store created successfully"}

    except mysql.connector.Error as err:
        print(err)
        return "Database error"

    finally:
        cursor.close()
        conn.close()    

@app.route('/stores', methods=['GET'])
def get_stores():

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT id, store_name
        FROM stores
        ORDER BY store_name
        """
    )

    stores = cursor.fetchall()

    cursor.close()
    conn.close()

    return stores

@app.route('/store-summary/<int:store_id>', methods=['GET'])
def store_summary(store_id):

    conn = get_db_connection()
    cursor = conn.cursor()

    # Total Medicines
    cursor.execute(
        "SELECT COUNT(*) FROM medicines WHERE store_id=%s",
        (store_id,)
    )
    total = cursor.fetchone()[0]

    # Low Stock
    cursor.execute(
        """
        SELECT COUNT(*)
        FROM medicines
        WHERE stock < 10
        AND stock > 0
        AND store_id=%s
        """,
        (store_id,)
    )
    low_stock = cursor.fetchone()[0]

    # Out Of Stock
    cursor.execute(
        """
        SELECT COUNT(*)
        FROM medicines
        WHERE stock <= 0
        AND store_id=%s
        """,
        (store_id,)
    )
    out_of_stock = cursor.fetchone()[0]

    # Expired
    cursor.execute(
        """
        SELECT COUNT(*)
        FROM medicines
        WHERE expiry_date < CURDATE()
        AND store_id=%s
        """,
        (store_id,)
    )
    expired = cursor.fetchone()[0]

    cursor.close()
    conn.close()

    return {
        "total": total,
        "low_stock": low_stock,
        "out_of_stock": out_of_stock,
        "expired": expired
    }
       
@app.route('/store/<int:store_id>', methods=['GET'])
def get_store(store_id):

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT *
        FROM stores
        WHERE id=%s
        """,
        (store_id,)
    )

    store = cursor.fetchone()

    cursor.close()
    conn.close()

    return store

@app.route('/update-store/<int:store_id>', methods=['PUT'])
def update_store(store_id):

    data = request.get_json()

    store_name = data.get('store_name')
    password = data.get('password')
    owner_name = data.get('owner_name')
    phone = data.get('phone')
    email = data.get('email')
    address = data.get('address')

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        UPDATE stores
        SET
            store_name=%s,
            password=%s,
            owner_name=%s,
            phone=%s,
            email=%s,
            address=%s
        WHERE id=%s
        """,
        (
            store_name,
            password,
            owner_name,
            phone,
            email,
            address,
            store_id
        )
    )

    conn.commit()

    cursor.close()
    conn.close()

    return "Store Updated Successfully"

@app.route('/delete-store/<int:store_id>', methods=['DELETE'])
def delete_store(store_id):

    conn = get_db_connection()
    cursor = conn.cursor()

    try:

        # 1. Get all medicines under this store
        cursor.execute(
            "SELECT id FROM medicines WHERE store_id=%s",
            (store_id,)
        )
        medicines = cursor.fetchall()

        medicine_ids = [m[0] for m in medicines]

        # 2. Delete batches linked to those medicines
        if medicine_ids:
            format_strings = ','.join(['%s'] * len(medicine_ids))
            cursor.execute(
                f"DELETE FROM batches WHERE medicine_id IN ({format_strings})",
                tuple(medicine_ids)
            )

        # 3. Delete medicines
        cursor.execute(
            "DELETE FROM medicines WHERE store_id=%s",
            (store_id,)
        )

        # 4. Delete store itself
        cursor.execute(
            "DELETE FROM stores WHERE id=%s",
            (store_id,)
        )

        conn.commit()

        return "Store deleted successfully"

    except Exception as e:
        print(e)
        return "Error deleting store", 500

    finally:
        cursor.close()
        conn.close()
# RUN SERVER
if __name__ == '__main__':
    app.run(debug=True, port=5000)