import React, { useState } from 'react';
import { Calendar, Clock, CreditCard, Users, AlertCircle } from 'lucide-react';
import { Field, TimeSlot, BookingStatus, PaymentStatus } from '../../types';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card, { CardHeader, CardContent, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';

interface BookingFormProps {
  field: Field;
  timeSlot: TimeSlot;
  onConfirm: (paymentMethod: string, paymentType: 'full' | 'deposit') => void;
  onCancel: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  field,
  timeSlot,
  onConfirm,
  onCancel
}) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentType, setPaymentType] = useState<'full' | 'deposit'>('full');
  const [playerCount, setPlayerCount] = useState('10');
  const [teamName, setTeamName] = useState('');
  const [findTeammates, setFindTeammates] = useState(false);
  
  const depositAmount = Math.round(timeSlot.price * 0.3);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(paymentMethod, paymentType);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold text-gray-900">Confirm Your Booking</h2>
          <p className="text-gray-600">Complete the details below to secure your field</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Details</h3>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex items-start mb-3">
                    <Calendar className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <div className="ml-2">
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{timeSlot.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-3">
                    <Clock className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <div className="ml-2">
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-medium">
                        {timeSlot.startTime} - {timeSlot.endTime}
                        {timeSlot.isPeak && (
                          <Badge variant="warning" size="sm" className="ml-2">
                            Peak
                          </Badge>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <div className="ml-2">
                      <p className="text-sm text-gray-500">Field Type</p>
                      <p className="font-medium">{field.type}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of players
                    </label>
                    <select
                      value={playerCount}
                      onChange={(e) => setPlayerCount(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      {field.type === '5-a-side' && (
                        Array.from({ length: 6 }, (_, i) => (
                          <option key={i} value={i + 5}>{i + 5} players</option>
                        ))
                      )}
                      {field.type === '7-a-side' && (
                        Array.from({ length: 8 }, (_, i) => (
                          <option key={i} value={i + 7}>{i + 7} players</option>
                        ))
                      )}
                      {field.type === '11-a-side' && (
                        Array.from({ length: 12 }, (_, i) => (
                          <option key={i} value={i + 11}>{i + 11} players</option>
                        ))
                      )}
                    </select>
                  </div>
                  
                  <div>
                    <Input
                      label="Team Name (optional)"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="Enter your team name"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="findTeammates"
                      checked={findTeammates}
                      onChange={(e) => setFindTeammates(e.target.checked)}
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <label htmlFor="findTeammates" className="text-sm text-gray-700">
                      Help me find teammates for this session
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentType('full')}
                        className={`
                          flex flex-col items-center p-3 border rounded-md text-sm
                          ${paymentType === 'full' 
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                            : 'border-gray-300 hover:border-gray-400'}
                        `}
                      >
                        <span className="font-semibold text-base">£{timeSlot.price}</span>
                        <span>Full Payment</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setPaymentType('deposit')}
                        className={`
                          flex flex-col items-center p-3 border rounded-md text-sm
                          ${paymentType === 'deposit' 
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                            : 'border-gray-300 hover:border-gray-400'}
                        `}
                      >
                        <span className="font-semibold text-base">£{depositAmount}</span>
                        <span>Deposit Only</span>
                      </button>
                    </div>
                    {paymentType === 'deposit' && (
                      <p className="mt-2 text-sm text-amber-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Remaining £{timeSlot.price - depositAmount} due at venue
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`
                          flex items-center justify-center p-3 border rounded-md
                          ${paymentMethod === 'card' 
                            ? 'border-emerald-500 bg-emerald-50' 
                            : 'border-gray-300 hover:border-gray-400'}
                        `}
                      >
                        <CreditCard className={`h-5 w-5 ${paymentMethod === 'card' ? 'text-emerald-600' : 'text-gray-500'}`} />
                        <span className="ml-2 text-sm">Card</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('paypal')}
                        className={`
                          flex items-center justify-center p-3 border rounded-md
                          ${paymentMethod === 'paypal' 
                            ? 'border-emerald-500 bg-emerald-50' 
                            : 'border-gray-300 hover:border-gray-400'}
                        `}
                      >
                        <span className={`text-sm font-semibold ${paymentMethod === 'paypal' ? 'text-emerald-600' : 'text-gray-500'}`}>PayPal</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('apple')}
                        className={`
                          flex items-center justify-center p-3 border rounded-md
                          ${paymentMethod === 'apple' 
                            ? 'border-emerald-500 bg-emerald-50' 
                            : 'border-gray-300 hover:border-gray-400'}
                        `}
                      >
                        <span className={`text-sm font-semibold ${paymentMethod === 'apple' ? 'text-emerald-600' : 'text-gray-500'}`}>Apple Pay</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">Price Summary</h4>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Field rental ({timeSlot.startTime} - {timeSlot.endTime})</span>
                      <span>£{timeSlot.price}</span>
                    </div>
                    {timeSlot.isPeak && (
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Peak hour surcharge</span>
                        <span>Included</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Booking fee</span>
                      <span>£0.00</span>
                    </div>
                    <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-semibold">
                      <span>Total</span>
                      <span>£{paymentType === 'full' ? timeSlot.price : depositAmount}</span>
                    </div>
                    {paymentType === 'deposit' && (
                      <div className="text-sm text-gray-600 mt-2">
                        Remaining balance: £{timeSlot.price - depositAmount} (payable at venue)
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
              >
                Confirm & Pay
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingForm;