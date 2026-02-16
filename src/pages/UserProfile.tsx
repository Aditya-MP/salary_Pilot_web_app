import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { User, Mail, Phone, CreditCard, Calendar, Building2, Plus, X, Star, Smartphone, Shield, Save, CheckCircle, Crown, Zap, TrendingUp, GraduationCap, Bot } from 'lucide-react';

export default function UserProfile() {
    const { userProfile, setUserProfile, addBank, removeBank, addUpi, removeUpi, isPremium, togglePremium } = useAppStore();

    // Local form state for personal details
    const [name, setName] = useState(userProfile.name);
    const [email, setEmail] = useState(userProfile.email);
    const [phone, setPhone] = useState(userProfile.phone);
    const [pan, setPan] = useState(userProfile.pan);
    const [dob, setDob] = useState(userProfile.dob);
    const [saved, setSaved] = useState(false);

    // Bank form state
    const [showBankForm, setShowBankForm] = useState(false);
    const [bankName, setBankName] = useState('');
    const [accountNo, setAccountNo] = useState('');
    const [ifsc, setIfsc] = useState('');

    // UPI form state
    const [showUpiForm, setShowUpiForm] = useState(false);
    const [upiId, setUpiId] = useState('');

    const handleSavePersonal = () => {
        setUserProfile({ name, email, phone, pan: pan.toUpperCase(), dob });
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const handleAddBank = () => {
        if (!bankName || !accountNo || !ifsc) return;
        addBank({ name: bankName, accountNo, ifsc: ifsc.toUpperCase(), primary: userProfile.banks.length === 0 });
        setBankName(''); setAccountNo(''); setIfsc(''); setShowBankForm(false);
    };

    const handleSetPrimary = (index: number) => {
        const updated = userProfile.banks.map((b, i) => ({ ...b, primary: i === index }));
        setUserProfile({ banks: updated });
    };

    const handleAddUpi = () => {
        if (!upiId) return;
        addUpi(upiId);
        setUpiId(''); setShowUpiForm(false);
    };

    const panValid = pan.length === 0 || /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan.toUpperCase());

    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-6 lg:p-8 shadow-lg shadow-violet-500/10">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZykiLz48L3N2Zz4=')] opacity-50" />
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-1">
                        <User className="text-white/70" size={16} />
                        <span className="text-violet-200 text-xs font-semibold tracking-wider uppercase">Account Settings</span>
                    </div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-white">Your Profile</h1>
                    <p className="text-violet-200/70 mt-1 text-sm">Manage personal & financial details</p>
                </div>
            </div>

            {/* ── Premium Subscription Card ── */}
            <div className={`rounded-2xl border overflow-hidden transition-all duration-500 ${isPremium
                    ? 'border-amber-500/20 bg-gradient-to-r from-amber-500/5 via-yellow-500/5 to-amber-500/5'
                    : 'border-white/[0.06] bg-white/[0.03]'
                }`}>
                <div className="px-6 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isPremium
                                ? 'bg-gradient-to-br from-amber-500 to-yellow-500 shadow-lg shadow-amber-500/30'
                                : 'bg-white/5 border border-white/[0.08]'
                            }`}>
                            <Crown size={22} className={isPremium ? 'text-white' : 'text-slate-500'} />
                        </div>
                        <div>
                            <h3 className="text-white font-semibold flex items-center gap-2">
                                SalaryPilot Pro
                                {isPremium && <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/20">ACTIVE</span>}
                            </h3>
                            <p className="text-xs text-slate-500 mt-0.5">
                                {isPremium ? 'You have full access to all premium features' : 'Unlock Quarterly Pulse, Learning Hub & AI Coach'}
                            </p>
                            {!isPremium && (
                                <div className="flex items-center gap-3 mt-2">
                                    <span className="inline-flex items-center gap-1 text-[10px] text-slate-500"><TrendingUp size={10} className="text-blue-400" />Quarterly Pulse</span>
                                    <span className="inline-flex items-center gap-1 text-[10px] text-slate-500"><GraduationCap size={10} className="text-emerald-400" />Learning Hub</span>
                                    <span className="inline-flex items-center gap-1 text-[10px] text-slate-500"><Bot size={10} className="text-violet-400" />AI Coach</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={togglePremium}
                        className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${isPremium
                                ? 'bg-white/5 text-slate-400 border border-white/[0.08] hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20'
                                : 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:shadow-lg hover:shadow-amber-500/25 hover:scale-[1.02]'
                            }`}
                    >
                        {isPremium ? (
                            <>Downgrade</>
                        ) : (
                            <><Zap size={14} /> Upgrade to Pro</>
                        )}
                    </button>
                </div>
            </div>

            {/* ── Two Column Grid Layout ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* ── Left Column: Personal Details ── */}
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden h-fit">
                    <div className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center"><Shield className="text-blue-400" size={14} /></div>
                        <h2 className="text-white font-semibold">Personal Details</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        {/* Name */}
                        <div className="space-y-1.5">
                            <label className="text-xs text-slate-500 font-medium flex items-center gap-1.5"><User size={12} />Full Name</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe"
                                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all" />
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-xs text-slate-500 font-medium flex items-center gap-1.5"><Mail size={12} />Email Address</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@example.com"
                                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all" />
                        </div>

                        {/* Phone & DOB row */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs text-slate-500 font-medium flex items-center gap-1.5"><Phone size={12} />Phone</label>
                                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210"
                                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs text-slate-500 font-medium flex items-center gap-1.5"><Calendar size={12} />Date of Birth</label>
                                <input type="date" value={dob} onChange={e => setDob(e.target.value)}
                                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all [color-scheme:dark]" />
                            </div>
                        </div>

                        {/* PAN */}
                        <div className="space-y-1.5">
                            <label className="text-xs text-slate-500 font-medium flex items-center gap-1.5"><CreditCard size={12} />PAN Number</label>
                            <input type="text" value={pan} onChange={e => setPan(e.target.value.toUpperCase())} placeholder="ABCDE1234F" maxLength={10}
                                className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 transition-all tracking-wider font-mono ${panValid ? 'border-white/[0.08] focus:border-blue-500/40 focus:ring-blue-500/20' : 'border-red-500/40 focus:border-red-500/40 focus:ring-red-500/20'}`} />
                            {!panValid && <p className="text-[10px] text-red-400">Invalid PAN format (e.g. ABCDE1234F)</p>}
                        </div>

                        {/* Save button */}
                        <button onClick={handleSavePersonal}
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all text-sm flex items-center justify-center gap-2">
                            {saved ? <><CheckCircle size={16} /> Saved!</> : <><Save size={16} /> Save Personal Details</>}
                        </button>
                    </div>
                </div>

                {/* ── Right Column: Financial Details ── */}
                <div className="space-y-6">

                    {/* Bank Accounts */}
                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
                        <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center"><Building2 className="text-emerald-400" size={14} /></div>
                                <h2 className="text-white font-semibold">Bank Accounts</h2>
                            </div>
                            <button onClick={() => setShowBankForm(!showBankForm)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20 hover:bg-emerald-500/20 transition-all">
                                <Plus size={12} /> Add Bank
                            </button>
                        </div>

                        <div className="p-6 space-y-3">
                            {userProfile.banks.length === 0 && !showBankForm && (
                                <div className="text-center py-6">
                                    <Building2 className="mx-auto text-slate-600 mb-2" size={32} />
                                    <p className="text-sm text-slate-500">No bank accounts linked yet</p>
                                    <p className="text-xs text-slate-600 mt-1">Add your bank to enable direct investments</p>
                                </div>
                            )}

                            {/* Existing banks */}
                            {userProfile.banks.map((bank, i) => (
                                <div key={i} className={`rounded-xl p-4 border transition-all ${bank.primary ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-white/[0.02] border-white/[0.06]'}`}>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-semibold text-white">{bank.name}</span>
                                                {bank.primary && <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"><Star size={8} />PRIMARY</span>}
                                            </div>
                                            <p className="text-xs text-slate-500 mt-1 font-mono tracking-wider">A/C: ••••{bank.accountNo.slice(-4)}</p>
                                            <p className="text-[10px] text-slate-600 mt-0.5">IFSC: {bank.ifsc}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            {!bank.primary && (
                                                <button onClick={() => handleSetPrimary(i)} className="p-1.5 rounded-lg hover:bg-white/5 text-slate-500 hover:text-emerald-400 transition-all" title="Set as primary">
                                                    <Star size={14} />
                                                </button>
                                            )}
                                            <button onClick={() => removeBank(i)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-all" title="Remove bank">
                                                <X size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Add bank form */}
                            {showBankForm && (
                                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-3">
                                    <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Link New Bank Account</p>
                                    <input type="text" value={bankName} onChange={e => setBankName(e.target.value)} placeholder="Bank Name (e.g. HDFC Bank)"
                                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all" />
                                    <div className="grid grid-cols-2 gap-3">
                                        <input type="text" value={accountNo} onChange={e => setAccountNo(e.target.value)} placeholder="Account Number"
                                            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all font-mono" />
                                        <input type="text" value={ifsc} onChange={e => setIfsc(e.target.value.toUpperCase())} placeholder="IFSC Code" maxLength={11}
                                            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all font-mono tracking-wider" />
                                    </div>
                                    <div className="flex gap-2 pt-1">
                                        <button onClick={() => setShowBankForm(false)}
                                            className="flex-1 px-4 py-2.5 bg-white/5 text-slate-300 rounded-xl text-xs font-semibold hover:bg-white/10 transition-all border border-white/[0.06]">Cancel</button>
                                        <button onClick={handleAddBank}
                                            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-xs font-semibold hover:shadow-lg hover:shadow-emerald-500/20 transition-all">Add Account</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* UPI IDs */}
                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">
                        <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-violet-500/20 flex items-center justify-center"><Smartphone className="text-violet-400" size={14} /></div>
                                <h2 className="text-white font-semibold">UPI IDs</h2>
                            </div>
                            <button onClick={() => setShowUpiForm(!showUpiForm)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-400 text-xs font-semibold border border-violet-500/20 hover:bg-violet-500/20 transition-all">
                                <Plus size={12} /> Add UPI
                            </button>
                        </div>

                        <div className="p-6 space-y-3">
                            {userProfile.upiIds.length === 0 && !showUpiForm && (
                                <div className="text-center py-6">
                                    <Smartphone className="mx-auto text-slate-600 mb-2" size={32} />
                                    <p className="text-sm text-slate-500">No UPI IDs linked yet</p>
                                    <p className="text-xs text-slate-600 mt-1">Link a UPI ID for instant transfers</p>
                                </div>
                            )}

                            {userProfile.upiIds.map((upi, i) => (
                                <div key={i} className="rounded-xl p-3.5 bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center"><Smartphone className="text-violet-400" size={14} /></div>
                                        <span className="text-sm text-white font-mono">{upi}</span>
                                    </div>
                                    <button onClick={() => removeUpi(i)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-all">
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}

                            {showUpiForm && (
                                <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-4 space-y-3">
                                    <p className="text-xs text-violet-400 font-semibold uppercase tracking-wider">Add UPI ID</p>
                                    <input type="text" value={upiId} onChange={e => setUpiId(e.target.value)} placeholder="name@upi or 9876543210@paytm"
                                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20 transition-all font-mono" />
                                    <div className="flex gap-2 pt-1">
                                        <button onClick={() => setShowUpiForm(false)}
                                            className="flex-1 px-4 py-2.5 bg-white/5 text-slate-300 rounded-xl text-xs font-semibold hover:bg-white/10 transition-all border border-white/[0.06]">Cancel</button>
                                        <button onClick={handleAddUpi}
                                            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl text-xs font-semibold hover:shadow-lg hover:shadow-violet-500/20 transition-all">Add UPI</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
