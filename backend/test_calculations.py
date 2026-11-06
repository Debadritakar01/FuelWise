
from services.calculations import calculate_petrol, calculate_ev

petrol = calculate_petrol(100, 45, 105)
ev = calculate_ev(100, 40, 8)

print("PETROL RESULT:")
print(petrol)

print("\nEV RESULT:")
print(ev)
