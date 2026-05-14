import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  LogOut,
  CalendarDays,
  MessageSquare,
  Check,
  X,
  Clock,
  Users,
  Mail,
  Phone,
  Eye,
  Trash2,
  RefreshCw,
  Lock,
} from "lucide-react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { supabase } from "../services/supabaseClient";
import { reservationsService } from "../services/reservationsService";
import { inquiriesService } from "../services/inquiriesService";
import { Reservation, Inquiry } from "../types";

type TabType = "bookings" | "inquiries";

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className={`p-5 rounded-2xl border ${color} flex items-center gap-4`}>
      <div className="w-10 h-10 rounded-xl bg-sand-50 flex items-center justify-center shadow-sm flex-shrink-0">
        <Icon className="w-5 h-5 text-charcoal-700" />
      </div>
      <div>
        <div className="text-2xl font-display font-bold text-charcoal-700">
          {value}
        </div>
        <div className="text-charcoal-500 text-xs">{label}</div>
      </div>
    </div>
  );
}

export default function Admin() {
  const [session, setSession] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("bookings");
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(!!data.session);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(!!s);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) fetchData();
  }, [session]);

  const fetchData = async () => {
    setDataLoading(true);
    try {
      const [res, inq] = await Promise.all([
        reservationsService.getAll(),
        inquiriesService.getAll(),
      ]);
      setReservations(res);
      setInquiries(inq);
    } catch (err) {
      toast.error("Failed to load data");
    } finally {
      setDataLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Welcome back!");
    }
    setLoginLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out");
  };

  const handleStatusUpdate = async (
    id: string,
    status: "approved" | "rejected",
  ) => {
    try {
      await reservationsService.updateStatus(id, status);
      setReservations((rs) =>
        rs.map((r) => (r.id === id ? { ...r, status } : r)),
      );
      toast.success(`Reservation ${status}`);
      setSelectedReservation(null);
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    try {
      await inquiriesService.delete(id);
      setInquiries((is) => is.filter((i) => i.id !== id));
      toast.success("Inquiry deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const stats = {
    total: reservations.length,
    pending: reservations.filter((r) => r.status === "pending").length,
    approved: reservations.filter((r) => r.status === "approved").length,
    inquiries: inquiries.length,
  };

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
      approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
      rejected: "bg-red-50 text-red-600 border-red-200",
    };
    return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${map[status] || ""}`;
  };

  // Login screen
  if (session === null) {
    return (
      <div className="min-h-screen bg-sand-50 flex items-center justify-center">
        <div className="animate-pulse text-charcoal-400">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-2xl bg-emerald-700 mb-4">
              <Leaf className="w-7 h-7 text-sand-50" />
            </div>
            <h1 className="font-display text-2xl font-semibold text-sand-50">
              Villa Jimena Resort
            </h1>
            <p className="text-emerald-300 text-sm mt-1">Admin Dashboard</p>
          </div>

          <div className="bg-sand-50 rounded-3xl shadow-luxury p-8">
            <div className="flex items-center gap-2 mb-6">
              <Lock className="w-4 h-4 text-charcoal-400" />
              <h2 className="font-semibold text-charcoal-700">Secure Login</h2>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-charcoal-700 mb-1.5 block">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-sand-200 rounded-xl text-sm input-luxury focus:outline-none"
                  placeholder="admin@villajimena.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-charcoal-700 mb-1.5 block">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-sand-200 rounded-xl text-sm input-luxury focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3.5 bg-emerald-700 text-sand-50 font-semibold rounded-xl hover:bg-emerald-800 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loginLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Top nav */}
      <header className="bg-sand-50 border-b border-sand-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-xl bg-emerald-700">
              <Leaf className="w-4 h-4 text-sand-50" />
            </div>
            <div>
              <span className="font-display font-semibold text-charcoal-700">
                Villa Jimena Resort
              </span>
              <span className="text-charcoal-400 text-xs ml-2 hidden sm:inline">
                Admin Dashboard
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="p-2 text-charcoal-500 hover:text-charcoal-700 hover:bg-sand-100 rounded-lg transition-colors"
              title="Refresh data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={CalendarDays}
            label="Total Bookings"
            value={stats.total}
            color="bg-sand-100 border-sand-200"
          />
          <StatCard
            icon={Clock}
            label="Pending"
            value={stats.pending}
            color="bg-yellow-50 border-yellow-100"
          />
          <StatCard
            icon={Check}
            label="Approved"
            value={stats.approved}
            color="bg-emerald-50 border-emerald-100"
          />
          <StatCard
            icon={MessageSquare}
            label="Inquiries"
            value={stats.inquiries}
            color="bg-purple-50 border-purple-100"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["bookings", "inquiries"] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold capitalize transition-colors ${
                activeTab === tab
                  ? "bg-emerald-700 text-sand-50 shadow-sm"
                  : "bg-sand-50 text-charcoal-500 border border-sand-200 hover:bg-sand-50"
              }`}
            >
              {tab}{" "}
              {tab === "bookings" ? `(${stats.total})` : `(${stats.inquiries})`}
            </button>
          ))}
        </div>

        {/* Content */}
        {dataLoading ? (
          <div className="bg-sand-50 rounded-2xl border border-sand-100 p-16 text-center text-charcoal-400">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-3" />
            Loading...
          </div>
        ) : activeTab === "bookings" ? (
          <div className="bg-sand-50 rounded-2xl border border-sand-100 overflow-hidden">
            {reservations.length === 0 ? (
              <div className="text-center py-16 text-charcoal-400">
                <CalendarDays className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>No reservations yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-sand-50 border-b border-sand-100">
                      <th className="text-left px-5 py-3.5 font-semibold text-charcoal-700 text-xs uppercase tracking-wide">
                        Guest
                      </th>
                      <th className="text-left px-5 py-3.5 font-semibold text-charcoal-700 text-xs uppercase tracking-wide">
                        Dates
                      </th>
                      <th className="text-left px-5 py-3.5 font-semibold text-charcoal-700 text-xs uppercase tracking-wide">
                        Guests
                      </th>
                      <th className="text-left px-5 py-3.5 font-semibold text-charcoal-700 text-xs uppercase tracking-wide">
                        Status
                      </th>
                      <th className="text-left px-5 py-3.5 font-semibold text-charcoal-700 text-xs uppercase tracking-wide">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand-100">
                    {reservations.map((r) => (
                      <tr
                        key={r.id}
                        className="hover:bg-sand-50/50 transition-colors"
                      >
                        <td className="px-5 py-4">
                          <div className="font-medium text-charcoal-700">
                            {r.name}
                          </div>
                          <div className="text-charcoal-400 text-xs flex items-center gap-1 mt-0.5">
                            <Mail className="w-3 h-3" />
                            {r.email}
                          </div>
                          <div className="text-charcoal-400 text-xs flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3" />
                            {r.phone}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="text-charcoal-700">
                            {format(new Date(r.check_in), "MMM d")} →{" "}
                            {format(new Date(r.check_out), "MMM d, yyyy")}
                          </div>
                          <div className="text-charcoal-400 text-xs mt-0.5">
                            Requested{" "}
                            {r.created_at
                              ? format(new Date(r.created_at), "MMM d, h:mm a")
                              : "—"}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5">
                            <Users className="w-4 h-4 text-charcoal-400" />
                            <span>{r.guests}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className={statusBadge(r.status || "pending")}>
                            {r.status || "pending"}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedReservation(r)}
                              className="p-1.5 rounded-lg text-charcoal-400 hover:text-charcoal-700 hover:bg-sand-100 transition-colors"
                              title="View details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {r.status === "pending" && (
                              <>
                                <button
                                  onClick={() =>
                                    handleStatusUpdate(r.id!, "approved")
                                  }
                                  className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                                  title="Approve"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() =>
                                    handleStatusUpdate(r.id!, "rejected")
                                  }
                                  className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                                  title="Reject"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-sand-50 rounded-2xl border border-sand-100 overflow-hidden">
            {inquiries.length === 0 ? (
              <div className="text-center py-16 text-charcoal-400">
                <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>No inquiries yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-sand-50 border-b border-sand-100">
                      <th className="text-left px-5 py-3.5 font-semibold text-charcoal-700 text-xs uppercase tracking-wide">
                        Contact
                      </th>
                      <th className="text-left px-5 py-3.5 font-semibold text-charcoal-700 text-xs uppercase tracking-wide">
                        Message
                      </th>
                      <th className="text-left px-5 py-3.5 font-semibold text-charcoal-700 text-xs uppercase tracking-wide">
                        Date
                      </th>
                      <th className="text-left px-5 py-3.5 font-semibold text-charcoal-700 text-xs uppercase tracking-wide">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand-100">
                    {inquiries.map((inq) => (
                      <tr
                        key={inq.id}
                        className="hover:bg-sand-50/50 transition-colors"
                      >
                        <td className="px-5 py-4">
                          <div className="font-medium text-charcoal-700">
                            {inq.name}
                          </div>
                          <div className="text-charcoal-400 text-xs mt-0.5">
                            {inq.email}
                          </div>
                          {inq.phone && (
                            <div className="text-charcoal-400 text-xs mt-0.5">
                              {inq.phone}
                            </div>
                          )}
                        </td>
                        <td className="px-5 py-4 max-w-xs">
                          <p className="text-charcoal-700 line-clamp-2">
                            {inq.message}
                          </p>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-charcoal-400">
                          {inq.created_at
                            ? format(new Date(inq.created_at), "MMM d, yyyy")
                            : "—"}
                        </td>
                        <td className="px-5 py-4">
                          <button
                            onClick={() => handleDeleteInquiry(inq.id!)}
                            className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Reservation detail modal */}
      {selectedReservation && (
        <div
          className="fixed inset-0 bg-emerald-950/55 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedReservation(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-sand-50 rounded-3xl p-6 w-full max-w-md shadow-luxury"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-5">
              <h3 className="font-display text-xl font-semibold text-charcoal-700">
                Booking Details
              </h3>
              <button
                onClick={() => setSelectedReservation(null)}
                className="text-charcoal-400 hover:text-charcoal-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm mb-6">
              {[
                { label: "Name", value: selectedReservation.name },
                { label: "Email", value: selectedReservation.email },
                { label: "Phone", value: selectedReservation.phone },
                {
                  label: "Check-in",
                  value: format(
                    new Date(selectedReservation.check_in),
                    "MMMM d, yyyy",
                  ),
                },
                {
                  label: "Check-out",
                  value: format(
                    new Date(selectedReservation.check_out),
                    "MMMM d, yyyy",
                  ),
                },
                { label: "Guests", value: `${selectedReservation.guests}` },
                {
                  label: "Status",
                  value: selectedReservation.status || "pending",
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex justify-between py-2 border-b border-gray-50"
                >
                  <span className="text-charcoal-400">{label}</span>
                  <span
                    className={`font-medium ${label === "Status" ? statusBadge(value) : "text-charcoal-700"}`}
                  >
                    {value}
                  </span>
                </div>
              ))}
              {selectedReservation.special_requests && (
                <div className="py-2">
                  <div className="text-charcoal-400 mb-1">Special Requests</div>
                  <div className="text-charcoal-700 bg-sand-50 rounded-xl p-3 text-xs">
                    {selectedReservation.special_requests}
                  </div>
                </div>
              )}
            </div>

            {selectedReservation.status === "pending" && (
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    handleStatusUpdate(selectedReservation.id!, "rejected")
                  }
                  className="flex-1 py-3 border border-red-200 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-colors text-sm"
                >
                  Reject
                </button>
                <button
                  onClick={() =>
                    handleStatusUpdate(selectedReservation.id!, "approved")
                  }
                  className="flex-1 py-3 bg-emerald-700 text-sand-50 font-semibold rounded-xl hover:bg-emerald-800 transition-colors text-sm"
                >
                  Approve
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
