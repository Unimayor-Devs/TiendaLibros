import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getBookById, editBookAndInventory } from '../../../services/inventoryServices';
import "./UserInventoryScreen.css";

const UserInventoryEdit = () => {
  const navigate = useNavigate();
  const { bookId } = useParams(); 

  const [inventoryData, setInventoryData] = useState({
    invBookId: '',
    invCantStock: '',
    invStatus: 'Disponible',
    invDateAdd: new Date().toISOString().split('T')[0]
  });

  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const book = await getBookById(bookId);
        setBookData(book);

        const invBookId = book.invBookId || '';
        const invCantStock = book.invCantStock || '';
        const invStatus = book.invStatus || 'Disponible';

        setInventoryData({ 
          invBookId, 
          invCantStock, 
          invStatus, 
          invDateAdd: new Date().toISOString().split('T')[0] 
        });
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBookData();
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'invCantStock' && value < 0) return;
    setInventoryData({ ...inventoryData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmEdit = window.confirm('¿Está seguro de editar este libro del inventario?');
    if (confirmEdit) {
      try {
        await editBookAndInventory(bookId, inventoryData);
        alert('Libro editado en el inventario exitosamente');
        navigate('/inventory'); 
      } catch (error) {
        console.error('Error al editar libro en el inventario:', error);
      }
    }
  };

  const handleCancel = () => navigate('/inventory');

  return (
    <>
      <div className="navbar">
        <h1>Gestión de Inventario</h1>
        <div>
          <Link to="/inventory/" className="spaced-links">Ver Inventario</Link>
          <Link to="/inventory/add" className="btn btn-primary"> Agregar Libro</Link>

        </div>
      </div>

      <div className="edit-book-container">
        <h2>Editar Libro en Inventario</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>ID del Libro</label>
            <input
              type="text"
              name="invBookId"
              value={inventoryData.invBookId}
              onChange={handleChange}
              readOnly
              required
            />
          </div>
          <div className="form-group">
            <label>Cantidad en Stock</label>
            <input
              type="number"
              name="invCantStock"
              value={inventoryData.invCantStock}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Estado</label>
            <select
              name="invStatus"
              value={inventoryData.invStatus}
              onChange={handleChange}
              required
            >
              <option value="Disponible">Disponible</option>
              <option value="Oculto">Oculto</option>
              <option value="Agotado">Agotado</option>
            </select>
          </div>
          <button type="submit">Guardar Cambios</button>
          <button type="button" onClick={handleCancel}>Cancelar</button>
        </form>
      </div>
    </>
  );
};

export default UserInventoryEdit;
