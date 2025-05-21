import React from 'react';
import { Calendar, Clock, MapPin, Check, Download, Users } from 'lucide-react';
import { Booking, Field } from '../../types';
import Card, { CardHeader, CardContent, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import QRCode from '../ui/QRCode';

interface BookingConfirmationProps {
  booking: Booking;
  field: Field;
  onDone: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  booking,
  field,
  onDone
}) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card>
        <CardHeader className="text-center border-b bg-emerald-50">
          <div className="flex justify-center mb-4">
            <div className="bg-emerald-100 rounded-full p-3">
              <Check className="h-12 w-12 text-emerald-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Booking Confirmed!</h2>
          <p className="text-gray-600">Your booking has been successfully confirmed.</p>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Details</h3>
              
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div className="ml-3">
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{formatDate(booking.date)}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div className="ml-3">
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium">{booking.startTime} - {booking.endTime}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div className="ml-3">
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{field.name}</p>
                    <p className="text-sm text-gray-600">{field.location.address}, {field.location.city}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Users className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div className="ml-3">
                    <p className="text-sm text-gray-500">Field Type</p>
                    <p className="font-medium">{field.type}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Booking ID</span>
                    <span className="font-medium">{booking.id}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Status</span>
                    <span className="font-medium text-emerald-600">{booking.status}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Payment</span>
                    <span className="font-medium">
                      {booking.paymentStatus === 'deposit_paid' ? 'Deposit Paid' : 'Fully Paid'}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-semibold">
                    <span>Total amount</span>
                    <span>£{booking.totalPrice}</span>
                  </div>
                  {booking.paymentStatus === 'deposit_paid' && (
                    <div className="mt-2 text-sm text-amber-600">
                      Remaining payment due at venue: £{Math.round(booking.totalPrice * 0.7)}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Check-in QR Code</h3>
              
              <QRCode value={`booking:${booking.id}`} />
              
              <p className="text-sm text-gray-600 mt-2 text-center max-w-xs">
                Present this QR code when you arrive at the venue for quick check-in
              </p>
              
              <div className="mt-6 space-y-4 w-full">
                <Button
                  className="w-full"
                  icon={<Download className="h-4 w-4 mr-2" />}
                >
                  Download Booking Details
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full"
                >
                  Add to Calendar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between items-center border-t bg-gray-50 py-4">
          <div>
            <p className="text-sm text-gray-600">
              We'll send you a reminder 1 hour before your booking.
            </p>
          </div>
          <Button onClick={onDone}>
            Done
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookingConfirmation;