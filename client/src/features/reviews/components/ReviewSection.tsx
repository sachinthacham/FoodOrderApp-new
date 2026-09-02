import { useEffect, useState } from "react";
import {type Review, reviewService } from "../services/reviewService";
import { useAuthStore } from "@/store/useAuthStore";
import { Star, MessageSquare, Send, Loader2, User } from "lucide-react";

interface ReviewSectionProps {
  restaurantId: string;
}

export default function ReviewSection({ restaurantId }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { token, isAuthenticated } = useAuthStore();
  
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const data = await reviewService.getReviewsByRestaurant(restaurantId);
        setReviews(data);
      } catch (err: any) {
        // Just log or ignore if reviews fail to load to not break the page
        console.error("Failed to fetch reviews:", err);
        setError("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [restaurantId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !isAuthenticated) return;
    
    try {
      setIsSubmitting(true);
      const newReview = await reviewService.createReview({
        restaurantId,
        rating,
        comment
      }, token);
      
      setReviews([newReview, ...reviews]);
      setComment("");
      setRating(5);
    } catch (err: any) {
      setError(err.message || "Failed to submit review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, rev) => acc + rev.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  return (
    <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
           <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
             <MessageSquare className="w-8 h-8 text-red-500" /> Customer Reviews
           </h2>
           <p className="text-slate-500 mt-2 font-medium">Real experiences from our customers</p>
        </div>
        
        {reviews.length > 0 && (
          <div className="text-right flex flex-col items-end">
            <span className="text-4xl font-black text-slate-900 dark:text-white">
              {getAverageRating()}
            </span>
            <div className="flex gap-1 text-yellow-400 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className={`w-4 h-4 ${star <= Math.round(Number(getAverageRating())) ? "fill-current" : "text-slate-300 dark:text-slate-700"}`} />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">{reviews.length} Ratings</span>
          </div>
        )}
      </div>

      {/* Review Submission Form */}
      <div className="glass-card bg-white dark:bg-slate-900 rounded-[2rem] p-6 sm:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Write a Review</h3>
        
        {!isAuthenticated ? (
          <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl p-6 text-center">
             <p className="text-slate-600 dark:text-slate-300 font-medium mb-4">You need to be logged in to share your experience.</p>
             <a href="/signin" className="inline-block bg-red-500 text-white font-bold px-6 py-2 rounded-xl shadow hover:bg-red-600 transition-colors">Sign In</a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
               <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Your Rating</label>
               <div className="flex gap-2">
                 {[1, 2, 3, 4, 5].map((star) => (
                   <button
                     type="button"
                     key={star}
                     onClick={() => setRating(star)}
                     className={`p-2 rounded-full transition-all ${rating >= star ? 'text-yellow-400 scale-110' : 'text-slate-300 dark:text-slate-700 hover:text-yellow-200'}`}
                   >
                     <Star className={`w-8 h-8 ${rating >= star ? 'fill-current' : ''}`} />
                   </button>
                 ))}
               </div>
            </div>
            
            <div>
               <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Share your thoughts</label>
               <textarea
                 required
                 rows={4}
                 value={comment}
                 onChange={(e) => setComment(e.target.value)}
                 className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 outline-none focus:border-red-500 dark:focus:border-red-500 transition-colors resize-none text-slate-900 dark:text-white"
                 placeholder="How was the food and service?"
               ></textarea>
            </div>
            
            {error && <p className="text-red-500 text-sm font-bold">{error}</p>}

            <div className="flex justify-end">
               <button
                 type="submit"
                 disabled={isSubmitting || !comment.trim()}
                 className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
               >
                 {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                 {isSubmitting ? "Posting..." : "Post Review"}
               </button>
            </div>
          </form>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center py-12">
             <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
             <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
             <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">No reviews yet.</p>
             <p className="text-slate-400 text-sm mt-1">Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {reviews.map((review) => (
               <div key={review.id} className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 group hover:shadow-lg transition-shadow relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl -mr-12 -mt-12"></div>
                 <div className="flex items-start justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400">
                           <User className="w-5 h-5" />
                       </div>
                       <div>
                          <p className="font-bold text-slate-900 dark:text-white text-sm">Restaurant Guest</p>
                          <p className="text-xs text-slate-400 font-medium">{new Date(review.createdAt).toLocaleDateString()}</p>
                       </div>
                    </div>
                    <div className="flex gap-0.5 text-yellow-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`w-3.5 h-3.5 ${star <= review.rating ? "fill-current" : "text-slate-200 dark:text-slate-800"}`} />
                      ))}
                    </div>
                 </div>
                 <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed relative z-10">
                   "{review.comment}"
                 </p>
               </div>
             ))}
          </div>
        )}
      </div>

    </div>
  );
}
