"""Import tất cả model tại đây để Alembic nhìn thấy."""
# from app.models import role, user, barber, service, appointment, schedule, invoice, review  # noqa
from app.models.user import User
from app.models.role import Role
from app.models.barber import Barber
from app.models.service import Service

from app.models.appointment import Appointment
from app.models.schedule import Schedule
from app.models.invoice import Invoice
from app.models.review import Review