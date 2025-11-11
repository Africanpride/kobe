import Jumbotron from '@/components/ui/Jumbotron';


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
       <div className='block p-2'>
              <Jumbotron />
            <div className=''>
                {children}
            </div>
          </div>

  );
}
