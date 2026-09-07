from sqlalchemy import Column, Integer, String, Float, Date
from database import Base


class FreightRecord(Base):
    __tablename__ = "freight_records"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, nullable=False)
    origin = Column(String, nullable=False)
    destination = Column(String, nullable=False)
    cargo_type = Column(String, nullable=False)
    vessel_type = Column(String, nullable=False)
    freight_rate = Column(Float, nullable=False)
    fuel_price = Column(Float, nullable=True)
    quantity_tonnes = Column(Float, nullable=True)