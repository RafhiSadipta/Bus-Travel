const db = require('../db');

// Mengambil semua bus dengan fasilitas yang dimiliki
const getAllBuses = async () => {
    return db('bus')
        .select('bus.*', db.raw('GROUP_CONCAT(fasilitas.nama) as fasilitas'))
        .leftJoin('bus_fasilitas', 'bus.id', 'bus_fasilitas.bus_id')
        .leftJoin('fasilitas', 'bus_fasilitas.fasilitas_id', 'fasilitas.id')
        .groupBy('bus.id');
};

const getBusById = async (id) => {
    const bus = await db('bus').where({ id }).first();
    if (!bus) return null;

    const fasilitas = await db('fasilitas')
        .join('bus_fasilitas', 'fasilitas.id', 'bus_fasilitas.fasilitas_id')
        .where('bus_fasilitas.bus_id', id)
        .select('fasilitas.id', 'fasilitas.nama', 'fasilitas.deskripsi');

    return { ...bus, fasilitas };
};

const createBus = async (busData, fasilitasIds) => {
    const [busId] = await db('bus').insert(busData);

    if (fasilitasIds && fasilitasIds.length > 0) {
        const busFasilitas = fasilitasIds.map((fasilitasId) => ({
            bus_id: busId,
            fasilitas_id: fasilitasId,
        }));
        await db('bus_fasilitas').insert(busFasilitas);
    }

    return getBusById(busId);
};

const updateBusById = async (id, busData, fasilitasIds) => {
    await db('bus').where({ id }).update(busData);

    if (fasilitasIds) {
        await db('bus_fasilitas').where({ bus_id: id }).del();
        const busFasilitas = fasilitasIds.map((fasilitasId) => ({
            bus_id: id,
            fasilitas_id: fasilitasId,
        }));
        await db('bus_fasilitas').insert(busFasilitas);
    }

    return getBusById(id);
};

const deleteBusById = async (id) => {
    await db('bus_fasilitas').where({ bus_id: id }).del();
    await db('bus').where({ id }).del();
};

module.exports = {
    getAllBuses,
    getBusById,
    createBus,
    updateBusById,
    deleteBusById,
};
